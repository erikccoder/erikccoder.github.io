"use strict";
(function (_window, _document) {
    if (!NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (a) {
            for (var b = 0; b < this.length; b++) {
                a(this[b], b, this);
            }
        };
    }
    var $ = function $(selector) {
        return _document.querySelectorAll(selector);
    };
    
    var doReset = _window.location.search.match("ek=clear"),
    	tpl = "<div><a data-selector='{{selector}}' data-index='{{index}}' href='{{src}}'>{{src}}</a>{{video}}</div><hr>",
    	kodi = "<div><input type=\"text\" id=\"host\" size=\"15\" value=\"{{host}}\">:<input type=\"text\" id=\"port\" size=\"6\" value=\"{{port}}\"><button class=\"sendToKodi\" data-src=\"{{src}}\">send to kodi</button></div>",
    	request = "http:\/\/{{host}}:{{port}}\/jsonrpc?request={{option}}",
    	option = {
			"jsonrpc": "2.0",
			"id": 1,
			"method": "Player.Open",
			"params": {
				"item": {
					"file": null
				}
			}
		},
		host = localStorage.ekHost || "0.0.0.0" ,
		port = localStorage.ekPort || "80" ;
    	
    if (!doReset && localStorage.ek) {
        var ek = JSON.parse(localStorage.ek),
            list = $(ek.selector),
            ele = list[ek.index];
        if (ele) {
            if (ele.src) {
            	var _video = (ek.selector == "video") ? ele : ( ek.selector == "source" ? ele.parentNode : null);            	
            	if(_video){
            		_video.preload = true;
					_video.controls = true;
					_video.controls = true;
					_video.autoplay = true;
					
					var _sendToKodi = kodi.replace(/{{host}}/g, host)
											.replace(/{{port}}/g, port)
											.replace(/{{src}}/g, ele.src);
					
					_document.body.innerHTML = tpl
												.replace(/\{\{src\}\}/g, ele.src)
												.replace(/\{\{video\}\}/g, _video.outerHTML) + _sendToKodi;
                }else{
                	_window.location = ele.src;                	                	
                }
            } else {
                alert("Click Play button");
            }
        }
    }
	else
	{
		var searchNode = ["video", "source", "iframe"];
		var _html = "";
	
		searchNode.forEach(function (selector) {
			$(selector).forEach(function (ele, index) {        	
				if (ele.src) {            	
					var _video = (selector == "video") ? ele : ( selector == "source" ? ele.parentNode : null);
					var _e = tpl.replace(/\{\{selector\}\}/g, selector);
						_e = _e.replace(/\{\{src\}\}/g, ele.src);
						_e = _e.replace(/\{\{index\}\}/g, index);
						_e = _e.replace(/\{\{video\}\}/g, _video ? _video.outerHTML : "");				
					if(_video){
						_video.preload = true;
						_video.controls = true;
						_video.controls = true;
						_video.autoplay = true;
												
					var _sendToKodi = kodi.replace(/{{host}}/g, host)
											.replace(/{{port}}/g, port)
											.replace(/{{src}}/g, ele.src);
						_e += _sendToKodi;

					}				
					_html += _e;
				}
	
			});
		});
		_document.body.innerHTML = _html;
    }
	
    $("a").forEach(function (ele) {
        ele.addEventListener("click", function (evt) {
            evt.preventDefault();
            var data = evt.currentTarget.dataset;
            localStorage.ek = JSON.stringify({
                "selector": data.selector,
                "index": data.index
            });
            return;
        });
    });
    $(".sendToKodi").forEach(function (ele) {    	
        ele.addEventListener("click", function (evt) {
            evt.preventDefault();
            option.params.item.file = evt.currentTarget.dataset.src;
            option.id = Date.now();
            var _host = $("#host")[0].value,
            	_port = $("#port")[0].value;
            var _url = request.replace(/{{host}}/g, _host)
								.replace(/{{port}}/g, _port)
								.replace(/{{option}}/g, encodeURIComponent(JSON.stringify(option)))
								.replace(/%7B/g, '{')
								.replace(/%7D/g, '}');
            localStorage.ekHost = _host;
            localStorage.ekPort = _port;
            _window.location = _url;
            return;
        });
    });
})(window, document);
