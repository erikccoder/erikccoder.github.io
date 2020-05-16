const $ = (q) => document.querySelector(q);
const saveToken = (v) => localStorage.setItem('token', v);
const loadToken = (v) => localStorage.getItem('token');
const removeToken = (v) => localStorage.removeItem('token');

(async ()=>
{

	if(location.href.match(/\?(clear|reset)/))
	{
		removeToken();
	}

	const API = "https://api.github.com"
	const REPO = 'notes';
	const PATH = 'posts'

	let instance = axios.create({
	  headers: {
	    Authorization: `token ${loadToken()}`
	  }
	})

	let user;	
	const loading = $('#loading');				
	try
	{
		const res = await instance.get(`${API}/user`);
		user = res.data;
	
	}
	catch(e)
	{
		// console.log('need log in');

		if(loading)
		{
			loading.classList.add('hide');
		}
		const tokenWrap = $('.token-wrap');
		const token = $('#token');
		const button = $('button');
		if(tokenWrap)
		{
			tokenWrap.classList.add('show');
			if(button)
			{

				button.onclick = ()=> 
				{
					const {value} = token;
					if(value.length)
					{
						saveToken(value);
						console.log('token save');
						location.reload();
					}					
				}
			}
		}					
	}

	if(user)
	{
		// console.log(user);			
		const searchParams = new URLSearchParams(document.location.search);
		const b64 = decodeURIComponent(searchParams.get('d')); 
		const str = decodeURIComponent(escape(window.atob(b64)));
		const data = JSON.parse(str);

		const {
			link,
			author,		
			image,		
			time,
			title,
			video,
			tags,
			description,
			selection,
			filename		
		} = data;

		const filepath = `${API}/repos/${user.login}/${REPO}/contents/${PATH}/${filename}.md`;

		let isExists;
		let sha;
		try{
			const res = await instance.get(filepath);
			isExists = true;
			sha = res.data.sha;						
		}
		catch(e)
		{
			isExists = false;
		}

		//data to markdown
		let markdown = '------\n';
		[
			'link',
			'author',		
			'image',		
			'time',
			'title',
			'video',
			'tags',
		].forEach( k => 
		{
			if(data[k]) markdown += `${k}: ${data[k]}\n`
		});

		markdown += '------\n\n';

		if(title){
			markdown += `# ${title}\n\n`;
		}

		if(description){
			markdown += `> ${description}`;
		}
			
		markdown += `\n\n`;	
		if(selection){
			const turndownService = new TurndownService()
			const md = turndownService.turndown(selection)
			markdown += `${md}\n\n`;
		}

		if(image){
			markdown += `![image](${image})\n\n`;
		}

		markdown += `${link}\n`;

				
		if(filename)
		{
			let res;
			try{

				res = await instance.put(
					filepath,
					{
						content: encodeURIComponent(btoa(unescape(encodeURIComponent(markdown)))),
						message: (isExists ? 'Create' : 'Update') + ` ${markdown}.md`,
						sha,						
					}
				)
			}
			catch(e)
			{
				alert('can\'t create/update content');
				console.log(e);
				return;
			}

			window.history.back();
		}

	}

})()
