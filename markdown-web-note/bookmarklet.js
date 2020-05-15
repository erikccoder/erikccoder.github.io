(function(){

	const $ = (_q) => document.querySelector(_q);	
	const $v = (_q) => {
		const _$ = $(_q);
		if(!_$) {
			return null;
		}		
		return _$.text || _$.href || _$.content
	};

	const LINK = "http://localhost:8080/"

	const author = $v('meta[name="author"], meta[name="twitter:creator"], meta[property="article:author"]');
	const description = $v('meta[name="description"], meta[name="twitter:description"], meta[property="og:description"]');
	const image = $v('meta[name="twitter:image"], meta[property="og:image"]');
	const keywords = $v('meta[name="keywords"]');	
	const link = $v('link[rel="canonical"], meta[property="og:url"]') || window.location.href;
	const time = $v('meta[property="article:published_time"]');
	const title0 = $v('title, meta[name="twitter:title"], meta[property="og:title"]');
	const title = title0 ? title0.trim() : title0;
	const video = $v('meta[property="og:video"], meta[property="og:video:url"]');
	const tags = keywords 
				 ?  '\n -' + keywords.replace(/,\ /g, ',').split(',').join('\n- ')
				 : null;

	const data = {
		author,		
		image,		
		time,
		title,
		video,
		tags
	};
	let str = `------\n`;
	Object.keys(data).forEach( k => 
	{
		if(data[k]) str += `${k}: ${data[k]}\n`
	});
	str += `------\n\n`;

	if(title){
		str += `# ${title}\n`;
	}
	if(description){
		str += `${description}\n\n`;
	}
	if(image){
		str += `![image](${image})\n\n`;
	}

	str += `${link}\n`;

	console.log(str);

	// const markdown = btoa(str);
	const markdown = encodeURIComponent(btoa(unescape(encodeURIComponent(str))));
	const fileName = location.pathname.replace(/\/$/g, '').split('/').pop();
	

	console.log(markdown);	
	
	// return;
	setTimeout(()=>{
		location = `${LINK}?file=${fileName}&content=${markdown}`
	},0)

})()
