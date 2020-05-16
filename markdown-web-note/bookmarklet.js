(function(){

	const $ = (_q) => document.querySelectorAll(_q);	
	const $v = (_q) => {
		const _$ = $(_q);
		const len = _$.length;
		if(!len) 
		{
			return null;
		}
		const i = len - 1;		
		return _$[i].text || _$[i].src || _$[i].href || _$[i].content
	};

	const DEBUG = window.markdownWebNoteDebug;

	const LINK = "//erikccoder.github.io/markdown-web-note/index.html";

	let selection = window.getSelection();
	selection = selection.rangeCount ? selection.getRangeAt(0).cloneContents() : null;
	if(selection){
		const div = document.createElement('div')	
		div.style.display = 'none';
		div.appendChild(selection);
		// document.body.appendChild(div);
		selection = div.innerHTML;
	}
	
	const author = $v('meta[name="author"], meta[name="twitter:creator"], meta[property="article:author"]');
	const description = $v('meta[name="description"], meta[name="twitter:description"], meta[property="og:description"]');
	const image0 = $v('meta[name="twitter:image"], meta[property="og:image"]');
	const image = image0 ? image0 : $v('img');
	const keywords = $v('meta[name="keywords"]');	
	const link = $v('link[rel="canonical"], meta[property="og:url"]') || window.location.href;
	const time = $v('meta[property="article:published_time"]');
	const title0 = $v('title, meta[name="twitter:title"], meta[property="og:title"]');
	const title = title0 ? title0.trim() : title0;
	const video = $v('meta[property="og:video"], meta[property="og:video:url"]');
	const tags = keywords 
				 ?  '\n- ' + keywords.replace(/,\ /g, ',').split(',').join('\n- ')
				 : null;

	let filename = DEBUG ? 'DEBUG' : location.pathname.replace(/\/$/g, '').split('/').pop() + '---' + location.hostname;

	const data = {
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
	};

	/*
	let str = `------\n`;
	Object.keys(data).forEach( k => 
	{
		if(data[k]) str += `${k}: ${data[k]}\n`
	});
	str += `------\n\n`;

	if(title){
		str += `# ${title}\n\n`;
	}
	if(description){
		str += `${description}\n\n`;
	}
	if(image){
		str += `![image](${image})\n\n`;
	}

	str += `${link}\n`;
	*/
	// const markdown = encodeURIComponent(btoa(unescape(encodeURIComponent(str))));

	const dataStr = JSON.stringify(data);
	const encoded = encodeURIComponent(dataStr);
	const b64 = encodeURIComponent(btoa(unescape(encoded)));
	// console.log(dataStr);
	// console.log(encoded);
	// console.log(b64);

		
	setTimeout(()=>{
		location = DEBUG 
					? `http://localhost:8080?d=${b64}` 
					: `${LINK}?d=${b64}` 
	},0)
	

})()
