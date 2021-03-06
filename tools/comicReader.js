var libjQuery = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
	libMagnific = "//erikccoder.github.io/tools/libs/jquery.magnific-popup.min.js";
	

var c = document.createElement("link");
    c.rel = "stylesheet";
    c.href = "//erikccoder.github.io/tools/libs/magnificpopup.all.min.css";	

var c2 = document.createElement("link");
    c2.rel = "stylesheet";
    c2.href = "//erikccoder.github.io/tools/css/comicReader.css";	

var emptyImageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=";

function getElementByXpath(a, b) {
            return b = b || document, document.evaluate(a, null === b ? _document : b, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
}
function async(u, c) {

  var d = document, 
	  t = 'script',
      o = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
  o.src = u;
  if (c) { o.addEventListener('load', function (e) { c(null, e); }, false); }
  d.body.appendChild(o);
}

function dm5Handler() 
{
	var url = window.location.href;
	DM5_PAGE = 1;
	if (url.indexOf('-p') > 0) {
		DM5_PAGE = parseInt(url.substring(url.indexOf("-p") + 2), 10);
	}
	croot = DM5_CURL.substring(0, DM5_CURL.length - 1) + "-p";

	var mkey = '';
	if ($("#dm5_key")
		.length > 0) {
		mkey = $("#dm5_key")
			.val();
	}
	getCurrentPage = function() {
		return DM5_PAGE - 1;
	};
	getPageCount = function() {
		return DM5_IMAGE_COUNT;
	};
	getImgURL = function(thePage) {
		var ret = "";

		$.ajax({
			url: 'chapterimagefun.ashx',
			data: {
				cid: DM5_CID,
				page: thePage + 1,
				language: 1,
				key: mkey
			},
			type: 'GET',
			async: false,
			error: function(msg) {},
			success: function(msg) {
				if (msg != '') {
					var arr;
					eval(msg);
					ret = d[0];
				};
			}
		});

		return ret;
	};
	setCurrentPage = function(thePage) {
		DM5_PAGE = thePage + 1;
	};
	getPageURL = function(thePage) {
		return croot + (thePage + 1) + "/";
	};

	getPrevChapter = function() {
		return false;
	};
	// var nurl=new String(window.location);
	// var cid=nurl.substring(nurl.indexOf("-")+1,nurl.indexOf("_"));
	// var nextUrl="../../tiaozhuan.aspx"+"?cid="+cid;
	getNextChapter = function() {
		return {
			text: "",
			href: DM5_CURL_END
		};
	};


}

var parseEngine = {
	"dm5.com": dm5Handler,
	"dm9.com": dm5Handler,
	"e-.+.org/s/": function() 
	{
	    var a = parseInt(location.pathname.replace(/\/s\/.+-([0-9]*)/g, "$1")),
	        b = parseInt(getElementByXpath("/html/body/div/div[1]/div/span[2]").innerText),
	        c = [],
	        d = "//body/div[1]/a/img",
	        e = "//body/div/div[1]/a[2]",
	        f = "//body/div/div[1]/a[3]";
			getCurrentPage = function() {
				return a - 1
			}, getPageCount = function() {
				return b
			}, getImgURL = function(a) {
				var h = c[a],
					i = document.createElement("html");
				if (null === h || "" === h || void 0 === h) return '#';
				var j = new XMLHttpRequest;
				j.open("GET", h, !1), j.send(), i.innerHTML = j.responseText;
				var k = getElementByXpath(d, i);
				return a > 0 && (c[a - 1] = getElementByXpath(e, i).href), b - 1 > a && (c[a + 1] = getElementByXpath(f, i).href), k.src
			}, setCurrentPage = function(b) {
				a = b + 1
			}, getPageURL = function(a) {
				return c[a]
			}, getPrevChapter = function() {
				return !1
			}, getNextChapter = function() {
				return !1
			}, c[getCurrentPage()] = location.pathname
	}
};





async(libjQuery, function(){
	PageEngineSet()
	PageReset();

	async(libMagnific, function() 
	{
		var ekComic = $(".ek-comic");
		var magnificPopup = $.magnificPopup.instance;
		var oldTitle = window.title;
		var $window = $("html, body");
		
		function preLoadSiblings(index){
			for(var i = index + 2; i >= index-2; i--)
			{
				var j = Math.abs(i % getPageCount());
				var old = ekComic[j].href;
				if(ekComic[j] && ekComic.eq(j).attr("href") == "#")
					ekComic[j].href = getImgURL(j);
			}
		}

		
		ekComic[getCurrentPage()].href = getImgURL(getCurrentPage());
		
		ekComic.magnificPopup({
			type:'image', 
			mainClass: "avia-popup mfp-zoom-in",
			closeOnBgClick: false,
			fixedBgPos: true,
			showCloseBtn: false,
			closeBtnInside: false,			
			closeMarkup: '<button onclick="fullscreen()" class="button-fs" title="Toggle fullscreen">&#9857;</button>',
			alignTop: true,
			image:{
				verticalFit: false
			},
			gallery:{
				enabled:true
			},
			callbacks:{
				open: function()
				{
					//overwrite default prev + next function. Add timeout for css3 crossfade animation
					$.magnificPopup.instance.next = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
					}
					$.magnificPopup.instance.prev = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
					}
					
					//add custom css class for different styling
					if( this.st.el && this.st.el.data('av-extra-class') )
					{
						this.wrap.addClass( this.currItem.el.data('av-extra-class') );
					}
														
				},
				change: function() 
				{
					var _cur = magnificPopup.index;
					setCurrentPage(_cur);
					setTimeout(function(){
					
						$.magnificPopup.instance.container.parent().animate({ scrollTop: "0px" }, function(){
							window.scrollTo(0,0);
						});
						
						preLoadSiblings(_cur);
						
					},0);
					history.pushState({}, _cur + "/" + getPageCount() + " " + oldTitle, getPageURL(magnificPopup.index));
				},
				imageLoadComplete: function() 
				{	
					var self = this;
					setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
				}				
			},
		}).eq(getCurrentPage()).click();
		
		setTimeout(preLoadSiblings, 0, getCurrentPage());

		/*
		setTimeout(function(){
			seq.forEach((el, i) => ekComic[i].href = getImgURL(i));
		}, 0);
		*/
		$(document.body).keyup(function(event){
			if(event.keyCode == 70)
			{
				var elem = document.body;
				if (elem.requestFullscreen) {
				  elem.requestFullscreen();
				} else if (elem.msRequestFullscreen) {
				  elem.msRequestFullscreen();
				} else if (elem.mozRequestFullScreen) {
				  elem.mozRequestFullScreen();
				} else if (elem.webkitRequestFullscreen) {
				  elem.webkitRequestFullscreen();
				}
			}
			else if(event.keyCode == 32)
			{
				var _c = $.magnificPopup.instance.content;
				var _p = $.magnificPopup.instance.container.parent();
				
				if(_p.scrollTop() + _p.height() == _c.height()) 
				{
				   $.magnificPopup.instance.next()
			   }
			}
		});
		
	});

});


function PageEngineSet(){
	var parserFound = false;
	for (var parser in parseEngine) {
		if (RegExp(parser.replace(/\.|\/|\*/g, function(e) {
				return ({
					".": "\.",
					"/": "\/",
					"*": ".*"
				})[e];
			}))
			.test(window.location.href)) {
			parserFound = true;
			parseEngine[parser]();
			break;
		}
	}
	if (!parserFound) {
		var parsers = [];
		for (var parser in parseEngine) {
			parsers.push.apply(parsers, parser.split("|"));
		}
		alert(formatStr(loc_NOPARSER, parsers.join("\n")));
		return;
	}
}

function PageReset(){
	var AllLinks = document.querySelectorAll("head>link");
    for (var i = 0; i < AllLinks.length; ++i){
    	document.head.removeChild(AllLinks[i]);
    }
    document.body.style.cssText = "margin:0;padding:0;text-align:center;";
        
	// clear the images for more memory
	var emptyImageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=";
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; ++i)
	{
		imgs[i].src = emptyImageSrc;
	}
	
	document.body.innerHTML = "";
	var divRoot = document.createElement("div");
		divRoot.className = "root"
	for (i = 0; i < getPageCount(); ++i) {
		var _a = $("<a>");
// 		_a.text("Comic[" + (i+1) + "]");
		_a.attr("href", "#");
		_a.addClass("ek-comic");
		divRoot.appendChild(_a[0]);
	}
	document.body.appendChild(divRoot);
	
	var m = document.createElement("meta");
        m.name = "viewport";
		m.content = "user-scalable=no,width=device-width,initial-scale=1.0,maximum-scale=1.0";
		document.getElementsByTagName("head")[0].appendChild(m);
		
	
	document.head.appendChild(c);
	document.head.appendChild(c2);
}
