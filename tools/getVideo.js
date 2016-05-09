((_window, _document) => {
	var $ = function(selector){ return _document.querySelectorAll(selector); },
		doReset = _window.location.search.match("ek=clear");
	if(!doReset && localStorage.ek)
	{
		var ek = JSON.parse(localStorage.ek),
			list = $(ek.selector),
			ele = list[ek.index];
		if(ele)
		{
			if(ele.src){
				_window.location = ele.src;
				return;
			}
			else{
				alert("Click Play button");
			}
		}
	}

	var searchNode = ["video", "source", "iframe"];

	searchNode.forEach((selector) => {
		$(selector).forEach((ele, index) => {	
			
			if (ele.src)
			{
				_document.write("<div><a data-selector='"+selector+"' data-index='"+index+"' href='"+ele.src+"'>"+ ele.src +"</a></div><hr>");
			}
		});
	});

	$("a").forEach((ele) => {
		ele.addEventListener("click", 
		(evt)=>{
			evt.preventDefault();
			var data = evt.currentTarget.dataset;
			localStorage.ek = JSON.stringify({
				"selector" : data.selector,
				"index" : data.index
			});
			
			return;
		})
	});
})(window, document);