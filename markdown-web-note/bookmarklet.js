var TurndownService=function(){"use strict";function e(e,n){return Array(n+1).join(e)}var n=["address","article","aside","audio","blockquote","body","canvas","center","dd","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frameset","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","isindex","li","main","menu","nav","noframes","noscript","ol","output","p","pre","section","table","tbody","td","tfoot","th","thead","tr","ul"];function t(e){return-1!==n.indexOf(e.nodeName.toLowerCase())}var r=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];function i(e){return-1!==r.indexOf(e.nodeName.toLowerCase())}var o=r.join();var a={};function l(e){for(var n in this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[],e.rules)this.array.push(e.rules[n])}function u(e,n,t){for(var r=0;r<e.length;r++){var i=e[r];if(c(i,n,t))return i}}function c(e,n,t){var r=e.filter;if("string"==typeof r){if(r===n.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(r.indexOf(n.nodeName.toLowerCase())>-1)return!0}else{if("function"!=typeof r)throw new TypeError("`filter` needs to be a string, array, or function");if(r.call(e,n,t))return!0}}function s(e){var n=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),n}function f(e,n,t){return e&&e.parentNode===n||t(n)?n.nextSibling||n.parentNode:n.firstChild||n.nextSibling||n.parentNode}a.paragraph={filter:"p",replacement:function(e){return"\n\n"+e+"\n\n"}},a.lineBreak={filter:"br",replacement:function(e,n,t){return t.br+"\n"}},a.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(n,t,r){var i=Number(t.nodeName.charAt(1));return"setext"===r.headingStyle&&i<3?"\n\n"+n+"\n"+e(1===i?"=":"-",n.length)+"\n\n":"\n\n"+e("#",i)+" "+n+"\n\n"}},a.blockquote={filter:"blockquote",replacement:function(e){return"\n\n"+(e=(e=e.replace(/^\n+|\n+$/g,"")).replace(/^/gm,"> "))+"\n\n"}},a.list={filter:["ul","ol"],replacement:function(e,n){var t=n.parentNode;return"LI"===t.nodeName&&t.lastElementChild===n?"\n"+e:"\n\n"+e+"\n\n"}},a.listItem={filter:"li",replacement:function(e,n,t){e=e.replace(/^\n+/,"").replace(/\n+$/,"\n").replace(/\n/gm,"\n    ");var r=t.bulletListMarker+"   ",i=n.parentNode;if("OL"===i.nodeName){var o=i.getAttribute("start"),a=Array.prototype.indexOf.call(i.children,n);r=(o?Number(o)+a:a+1)+".  "}return r+e+(n.nextSibling&&!/\n$/.test(e)?"\n":"")}},a.indentedCodeBlock={filter:function(e,n){return"indented"===n.codeBlockStyle&&"PRE"===e.nodeName&&e.firstChild&&"CODE"===e.firstChild.nodeName},replacement:function(e,n,t){return"\n\n    "+n.firstChild.textContent.replace(/\n/g,"\n    ")+"\n\n"}},a.fencedCodeBlock={filter:function(e,n){return"fenced"===n.codeBlockStyle&&"PRE"===e.nodeName&&e.firstChild&&"CODE"===e.firstChild.nodeName},replacement:function(n,t,r){for(var i,o=((t.firstChild.className||"").match(/language-(\S+)/)||[null,""])[1],a=t.firstChild.textContent,l=r.fence.charAt(0),u=3,c=new RegExp("^"+l+"{3,}","gm");i=c.exec(a);)i[0].length>=u&&(u=i[0].length+1);var s=e(l,u);return"\n\n"+s+o+"\n"+a.replace(/\n$/,"")+"\n"+s+"\n\n"}},a.horizontalRule={filter:"hr",replacement:function(e,n,t){return"\n\n"+t.hr+"\n\n"}},a.inlineLink={filter:function(e,n){return"inlined"===n.linkStyle&&"A"===e.nodeName&&e.getAttribute("href")},replacement:function(e,n){return"["+e+"]("+n.getAttribute("href")+(n.title?' "'+n.title+'"':"")+")"}},a.referenceLink={filter:function(e,n){return"referenced"===n.linkStyle&&"A"===e.nodeName&&e.getAttribute("href")},replacement:function(e,n,t){var r,i,o=n.getAttribute("href"),a=n.title?' "'+n.title+'"':"";switch(t.linkReferenceStyle){case"collapsed":r="["+e+"][]",i="["+e+"]: "+o+a;break;case"shortcut":r="["+e+"]",i="["+e+"]: "+o+a;break;default:var l=this.references.length+1;r="["+e+"]["+l+"]",i="["+l+"]: "+o+a}return this.references.push(i),r},references:[],append:function(e){var n="";return this.references.length&&(n="\n\n"+this.references.join("\n")+"\n\n",this.references=[]),n}},a.emphasis={filter:["em","i"],replacement:function(e,n,t){return e.trim()?t.emDelimiter+e+t.emDelimiter:""}},a.strong={filter:["strong","b"],replacement:function(e,n,t){return e.trim()?t.strongDelimiter+e+t.strongDelimiter:""}},a.code={filter:function(e){var n=e.previousSibling||e.nextSibling,t="PRE"===e.parentNode.nodeName&&!n;return"CODE"===e.nodeName&&!t},replacement:function(e){if(!e.trim())return"";var n="`",t="",r="",i=e.match(/`+/gm);if(i)for(/^`/.test(e)&&(t=" "),/`$/.test(e)&&(r=" ");-1!==i.indexOf(n);)n+="`";return n+t+e+r+n}},a.image={filter:"img",replacement:function(e,n){var t=n.alt||"",r=n.getAttribute("src")||"",i=n.title||"";return r?"!["+t+"]("+r+(i?' "'+i+'"':"")+")":""}},l.prototype={add:function(e,n){this.array.unshift(n)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){return e.isBlank?this.blankRule:(n=u(this.array,e,this.options))?n:(n=u(this._keep,e,this.options))?n:(n=u(this._remove,e,this.options))?n:this.defaultRule;var n},forEach:function(e){for(var n=0;n<this.array.length;n++)e(this.array[n],n)}};var d="undefined"!=typeof window?window:{};var p,h,m=function(){var e=d.DOMParser,n=!1;try{(new e).parseFromString("","text/html")&&(n=!0)}catch(e){}return n}()?d.DOMParser:(p=function(){},function(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch(n){window.ActiveXObject&&(e=!0)}return e}()?p.prototype.parseFromString=function(e){var n=new window.ActiveXObject("htmlfile");return n.designMode="on",n.open(),n.write(e),n.close(),n}:p.prototype.parseFromString=function(e){var n=document.implementation.createHTMLDocument("");return n.open(),n.write(e),n.close(),n},p);function g(e){var n;"string"==typeof e?n=(h=h||new m).parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html").getElementById("turndown-root"):n=e.cloneNode(!0);return function(e){var n=e.element,t=e.isBlock,r=e.isVoid,i=e.isPre||function(e){return"PRE"===e.nodeName};if(n.firstChild&&!i(n)){for(var o=null,a=!1,l=null,u=f(l,n,i);u!==n;){if(3===u.nodeType||4===u.nodeType){var c=u.data.replace(/[ \r\n\t]+/g," ");if(o&&!/ $/.test(o.data)||a||" "!==c[0]||(c=c.substr(1)),!c){u=s(u);continue}u.data=c,o=u}else{if(1!==u.nodeType){u=s(u);continue}t(u)||"BR"===u.nodeName?(o&&(o.data=o.data.replace(/ $/,"")),o=null,a=!1):r(u)&&(o=null,a=!0)}var d=f(l,u,i);l=u,u=d}o&&(o.data=o.data.replace(/ $/,""),o.data||s(o))}}({element:n,isBlock:t,isVoid:i}),n}function v(e){return e.isBlock=t(e),e.isCode="code"===e.nodeName.toLowerCase()||e.parentNode.isCode,e.isBlank=function(e){return-1===["A","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"].indexOf(e.nodeName)&&/^\s*$/i.test(e.textContent)&&!i(e)&&!function(e){return e.querySelector&&e.querySelector(o)}(e)}(e),e.flankingWhitespace=function(e){var n="",t="";if(!e.isBlock){var r=/^\s/.test(e.textContent),i=/\s$/.test(e.textContent),o=e.isBlank&&r&&i;r&&!y("left",e)&&(n=" "),o||!i||y("right",e)||(t=" ")}return{leading:n,trailing:t}}(e),e}function y(e,n){var r,i,o;return"left"===e?(r=n.previousSibling,i=/ $/):(r=n.nextSibling,i=/^ /),r&&(3===r.nodeType?o=i.test(r.nodeValue):1!==r.nodeType||t(r)||(o=i.test(r.textContent))),o}var k=Array.prototype.reduce,b=/^\n*/,w=/\n*$/,N=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function C(e){if(!(this instanceof C))return new C(e);var n={rules:a,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",blankReplacement:function(e,n){return n.isBlock?"\n\n":""},keepReplacement:function(e,n){return n.isBlock?"\n\n"+n.outerHTML+"\n\n":n.outerHTML},defaultReplacement:function(e,n){return n.isBlock?"\n\n"+e+"\n\n":e}};this.options=function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])}return e}({},n,e),this.rules=new l(this.options)}function x(e){var n=this;return k.call(e.childNodes,function(e,t){var r="";return 3===(t=new v(t)).nodeType?r=t.isCode?t.nodeValue:n.escape(t.nodeValue):1===t.nodeType&&(r=function(e){var n=this.rules.forNode(e),t=x.call(this,e),r=e.flankingWhitespace;(r.leading||r.trailing)&&(t=t.trim());return r.leading+n.replacement(t,e,this.options)+r.trailing}.call(n,t)),S(e,r)},"")}function S(e,n){var t,r,i,o=(t=n,r=[e.match(w)[0],t.match(b)[0]].sort(),(i=r[r.length-1]).length<2?i:"\n\n");return(e=e.replace(w,""))+o+(n=n.replace(b,""))}return C.prototype={turndown:function(e){if(!function(e){return null!=e&&("string"==typeof e||e.nodeType&&(1===e.nodeType||9===e.nodeType||11===e.nodeType))}(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(""===e)return"";var n=x.call(this,new g(e));return function(e){var n=this;return this.rules.forEach(function(t){"function"==typeof t.append&&(e=S(e,t.append(n.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}.call(this,n)},use:function(e){if(Array.isArray(e))for(var n=0;n<e.length;n++)this.use(e[n]);else{if("function"!=typeof e)throw new TypeError("plugin must be a Function or an Array of Functions");e(this)}return this},addRule:function(e,n){return this.rules.add(e,n),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return N.reduce(function(e,n){return e.replace(n[0],n[1])},e)}},C}();
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

	const LINK = "//erikccoder.github.io/markdown-web-note/index.html"


	const turndownService = new TurndownService();

	const selection = window.getSelection();
	const author = $v('meta[name="author"], meta[name="twitter:creator"], meta[property="article:author"]');
	const description = selection.rangeCount
						? turndownService.turndown(selection.getRangeAt(0).cloneContents()) 
						: $v('meta[name="description"], meta[name="twitter:description"], meta[property="og:description"]');
	const image0 = $v('meta[name="twitter:image"], meta[property="og:image"]');
	const image = image0 ? image0 : $v('img');
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
		link,
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
		str += `# ${title}\n\n`;
	}
	if(description){
		str += `${description}\n\n`;
	}
	if(image){
		str += `![image](${image})\n\n`;
	}

	str += `${link}\n`;

	const markdown = encodeURIComponent(btoa(unescape(encodeURIComponent(str))));
	const fileName = location.pathname.replace(/\/$/g, '').split('/').pop();
	
		
	setTimeout(()=>{
		location = DEBUG 
					? `${LINK}?file=DEBUG&content=${markdown}` 
					: `${LINK}?file=${fileName}&content=${markdown}` 
	},0)

})()
