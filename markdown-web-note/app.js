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
		console.log('need log in');

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
		const file = decodeURIComponent(searchParams.get('file')); 
		const content = decodeURIComponent(searchParams.get('content'));

		const filepath = `${API}/repos/${user.login}/${REPO}/contents/${PATH}/${file}.md`;

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

		// return;
				
		if(file && content)
		{
			let res;
			try{

				res = await instance.put(
					filepath,
					{
						content,
						message: (isExists ? 'Create' : 'Update') + ` ${file}.md`,
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
