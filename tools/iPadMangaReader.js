if ("www.dm5.com" !== window.location.host || /^\/m/.test(window.location.pathname))($___ = function() {
        function dm5Handler() {
            var callSeq = 0;
            console.log("dm5Handler");
            var url = window.location.href;
            DM5_PAGE = 1, url.indexOf("-p") > 0 && (DM5_PAGE = parseInt(url.substring(url.indexOf("-p") + 2), 10)), croot = DM5_CURL.substring(0, DM5_CURL.length - 1) + "-p";
            var mkey = "";
            $("#dm5_key").length > 0 && (mkey = $("#dm5_key").val()), getCurrentPage = function() {
                return DM5_PAGE - 1
            }, getPageCount = function() {
                return DM5_IMAGE_COUNT
            }, getImgURL = function(thePage) {
                var ret = "";
                return $.ajax({
                    url: "chapterimagefun.ashx",
                    data: {
                        cid: DM5_CID,
                        page: thePage + 1,
                        language: 1,
                        key: mkey
                    },
                    type: "GET",
                    async: !1,
                    error: function(a) {},
                    success: function(msg) {
                        if ("" != msg) {
                            var arr;
                            eval(msg), ret = d[0]
                        }
                    }
                }), ret
            }, setCurrentPage = function(a) {
                DM5_PAGE = a + 1
            }, getPageURL = function(a) {
                return croot + (a + 1) + "/"
            }, getPrevChapter = function() {
                return !1
            }, getNextChapter = function() {
                return {
                    text: "",
                    href: DM5_CURL_END
                }
            }
        }

        function getElementByXpath(a, b) {
            return b = b || document, document.evaluate(a, null === b ? _document : b, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        }
        var _window = window,
            _document = document,
            $_ = function(a) {
                return _document.getElementById(a)
            },
            m = _document.createElement("meta");
        m.name = "viewport";
        var c_page = 0,
            div_imgs = [],
            VerticalWritting = !0,
            Landscape = !1,
            MAXPRELOADPAGENUM = 10,
            getPageURL = function(a) {
                return _window.location.href
            },
            div_postprocess = function() {},
            configuration = localStorage.getItem("config") ? JSON.parse(localStorage.getItem("config")) : {};
        void 0 === configuration.SmoothAnimation && (configuration.SmoothAnimation = !0), void 0 === configuration.PreloadPages && (configuration.PreloadPages = 4);
        var getCurrentPage, getPageCount, getImgURL, setCurrentPage, getPrevChapter, getNextChapter, parseEngine = {
                "dm5.com": dm5Handler,
                "dm9.com": dm5Handler,
                "www.cococomic.com/manhua|www.99comic.com/manhua|mh.99770.cc/manhua|99770.cc/manhua": function() {
                    getCurrentPage = function() {
                        return parseInt(page, 10) - 1
                    }, getPageCount = function() {
                        return datas
                    }, getImgURL = function(a) {
                        return ServerList[server - 1] + arrPicListUrl[a]
                    }, setCurrentPage = function(a) {
                        page = a + 1
                    }, getPageURL = function(a) {
                        return "?v=" + (a + 1) + "*s=" + server
                    }, getPrevChapter = function() {
                        return !1
                    }, getNextChapter = function() {
                        return !1
                    }
                },
                "g.e-.+.org/s/": function() {
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
                        if (null === h || "" === h || void 0 === h) return emptyImageSrc;
                        var j = new XMLHttpRequest;
                        j.open("GET", h, !1), j.send(), i.innerHTML = j.responseText;
                        var k = getElementByXpath(d, i);
                        return a > 0 && (c[a - 1] = getElementByXpath(e, i).href), b - 1 > a && (c[a + 1] = getElementByXpath(f, i).href), k.src
                    }, setCurrentPage = function(b) {
                        a = b + 1
                    }, getPageURL = function(a) {
                        return base + "p=" + String(a)
                    }, getPrevChapter = function() {
                        return !1
                    }, getNextChapter = function() {
                        return !1
                    }, c[getCurrentPage()] = location.pathname
                }
            },
            formatStr = function(a) {
                var b = arguments,
                    c = 0;
                return a.replace(/%s/g, function(a) {
                    return ++c, void 0 === b[c] ? a : b[c]
                })
            },
            loc_RELOAD = "Reload",
            loc_LOADING = "Loading",
            loc_VERTICALWRITTING = "Vertical Writting",
            loc_CURRENTPAGE = "Current page:",
            loc_JUMPTOPAGE = "Jump to page",
            loc_FIRSTPAGE = "First page already",
            loc_LASTPAGE = "Last page already",
            loc_NOPARSER = "No support for this page, follwing pages only:\n%s",
            loc_NEXTCHAPTER = "Next Chapter:<br/>%s",
            loc_PREVCHAPTER = "Previous Chapter:<br/>%s",
            loc_NONEXTCHAPTER = "No next chapter",
            loc_NOPREVCHAPTER = "no previous chapter",
            loc_LANDSCAPEWARNING = "Landscape mode only, <br/>please rotate your device!",
            loc_PORTRAITWARNING = "Portrait mode only, <br/>please rotate your device!",
            loc_ANIMATIONENABLE = "Enable animation",
            loc_PRELOADPAGENUM = "Preload page number",
            parserFound = !1;
        for (var parser in parseEngine)
            if (RegExp(parser.replace(/\.|\/|\*/g, function(a) {
                    return {
                        ".": ".",
                        "/": "/",
                        "*": ".*"
                    }[a]
                })).test(_window.location.href)) {
                parserFound = !0, parseEngine[parser]();
                break
            }
        if (!parserFound) {
            var parsers = [];
            for (var parser in parseEngine) parsers.push.apply(parsers, parser.split("|"));
            return void alert(formatStr(loc_NOPARSER, parsers.join("\n")))
        }
        for (var setConfig = function(a, b) {
                configuration[a] = b, localStorage.setItem("config", JSON.stringify(configuration))
            }, emptyImageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=", imgs = _document.getElementsByTagName("img"), i = 0; i < imgs.length; ++i) imgs[i].src = emptyImageSrc;
        if (_window.oldTitle || (oldTitle = _document.title), "GenerateList" === localStorage.ReaderDebug) {
            for (var allImgs = "", i = 0; i < getPageCount(); ++i) {
                var img = getImgURL(i),
                    url;
                url = /http:|https:/.test(img) ? img : /^\//.test(img) ? location.origin + img : location.href.match(/.*\//)[0] + img, allImgs += encodeURI(url) + "<br/>"
            }
            return void(document.body.innerHTML = allImgs)
        }
        for (var AllLinks = _document.querySelectorAll("head>link"), i = 0; i < AllLinks.length; ++i) _document.head.removeChild(AllLinks[i]);
        _document.body.style.cssText = "margin:0;padding:0;text-align:center;", setTimeout(function() {
            if (/iPad/.test(navigator.userAgent) || "debug" === localStorage.ReaderDebug) {
                m.content = "user-scalable=no,width=device-width,initial-scale=1.0,maximum-scale=1.0", _document.getElementsByTagName("head")[0].appendChild(m), _document.body.innerHTML = '<div id="ReaderMain" class="iReader" style="opacity:0;left:0px;top:0px;-webkit-transition-duration:500ms;width:100%;height:100%;overflow:hidden;position:absolute;">', setTimeout(function() {
                    $_("ReaderMain").style.opacity = 1
                }, 0);
                var d = _document.createElement("div");
                for (d.style.cssText = "display:table;text-align:center;background-color:#D6D6D6;font-size:25px;position:absolute;left:0px;top:0px;width:100%;height:100%;overflow-x:hidden;overflow-y:hidden;z-index:0;", d.innerHTML = "<div style='display:table-cell;vertical-align:middle; text-align:center'>" + loc_LOADING + "</div>", $_("ReaderMain").appendChild(d), g = 0; g < getPageCount(); ++g) {
                    var a = _document.createElement("div");
                    a.style.cssText = "background-color:white;visibility:hidden;position:absolute;left:0px;top:0px;width:100%;height:100%;overflow-x:hidden;overflow-y:hidden;", a.page = g, a.tImg = new Image, a.appendChild(a.tImg), a.loadingText = document.createElement("span"), a.appendChild(a.loadingText), a.unloaded = !0, a.eraseImg = function() {
                        this.unloaded || (this.unloaded = !0, this.tImg.src = emptyImageSrc)
                    }, a.loadImg = function() {
                        var a = this;
                        return this.unloaded ? (this.unloaded = !1, this.tImg.onload = function() {
                            if ("debug" === localStorage.ReaderDebug && console.info("img:w[" + this.width + "] h[" + this.height + "]:" + this.src), 1 === this.width && 1 === this.height) return void setTimeout(function() {
                                a.tImg.onload()
                            }, 50);
                            this.setTransform(), this.onload = null;
                            for (var b = _document.body.childNodes.length - 1; b >= 0; --b) "iReader" !== _document.body.childNodes[b].className && _document.body.removeChild(_document.body.childNodes[b]);
                            a.style.opacity = 1
                        }, this.tImg.setTransform = function() {
                            this.unloaded || (this.pageHeight = _window.innerHeight, this.pageWidth = Math.floor(this.width * this.pageHeight / this.height), this.height < 10 ? (this.top = 0, this.left = 0) : (a.setToRight ^ !VerticalWritting ? this.left = this.pageWidth <= _window.innerWidth ? _window.innerWidth - this.pageWidth >> 1 : 0 : this.left = this.pageWidth <= _window.innerWidth ? _window.innerWidth - this.pageWidth >> 1 : _window.innerWidth - this.pageWidth, this.top = 0), this.style.webkitTransform = "translate(" + Math.ceil(this.left) + "px, " + Math.ceil(this.top) + "px)")
                        }, setTimeout(function() {
                            a.tImg.flink || (a.tImg.flink = getImgURL(a.page)), a.tImg.src = a.tImg.flink
                        }, 0), this.tImg.style.position = "absolute", this.tImg.style.left = "0px", this.tImg.style.top = "0px", this.tImg.style.width = "auto", this.tImg.style.height = "100%", this.tImg.left = this.tImg.top = 0, this.tImg.setTransform(), void(this.style.opacity = .01)) : void(this.tImg.onload || this.tImg.setTransform())
                    }, a.focusMe = function(a) {
                        setCurrentPage(this.page), $_("currentPage").innerHTML = this.page + 1 + "/" + getPageCount(), $_("PageJump").value = this.page;
                        try {
                            history.pushState({}, this.page + 1 + "/" + getPageCount() + " " + oldTitle, getPageURL(this.page))
                        } catch (b) {}
                        _document.title = this.page + 1 + "/" + getPageCount() + " " + oldTitle, div_imgs[this.page].style.visibility = "visible", div_imgs[this.page].setToRight = a, div_imgs[this.page].loadImg(!0);
                        for (var c = this.page + 1; c < div_imgs.length; ++c) div_imgs[c].style.visibility = "hidden", div_imgs[c].setToRight = !1, c > this.page + configuration.PreloadPages ? div_imgs[c].eraseImg() : div_imgs[c].loadImg(!1);
                        for (var c = this.page - 1; c >= 0; --c) div_imgs[c].style.visibility = "hidden", div_imgs[c].setToRight = !0, c < this.page - 2 ? div_imgs[c].eraseImg() : div_imgs[c].loadImg(!1);
                        div_imgs[this.page].style.webkitTransform = "translate(0px,0px)", configuration.SmoothAnimation && (div_imgs[this.page].style.webkitTransitionProperty = "-webkit-transform"), this.page > 0 && (div_imgs[this.page - 1].style.webkitTransform = "translate(" + (VerticalWritting ? 100 : -100) + "%,0px)"), this.page < div_imgs.length - 1 && (div_imgs[this.page + 1].style.webkitTransform = "translate(" + (VerticalWritting ? -100 : 100) + "%,0px)")
                    }, a.tImg.addEventListener("webkitTransitionEnd", function() {
                        this.style.webkitTransitionProperty = "none"
                    }, !1), a.tImg.style.webkitTransitionDuration = "300ms", a.tImg.style.webkitTransitionProperty = "none", a.tImg.style.webkitTransform = "translate(0px,0px)", a.style.webkitTransitionDuration = "300ms", a.style.webkitTransitionProperty = "none", a.style.webkitTransform = "translate(0px,0px)", a.addEventListener("webkitTransitionEnd", function() {
                        this.style.webkitTransitionProperty = "none"
                    }, !1), div_postprocess(a), d.appendChild(a), div_imgs.push(a)
                }
                var e = _document.createElement("div");
                e.style.cssText = "-webkit-transition-duration:300ms;font-size:25px;display:none;position:absolute;left:0px;top:0px;width:100%;height:100%;overflow-x:hidden;overflow-y:hidden;z-index:10;background-color:rgba(0,0,0,0.6);", e.enable = !1, $_("ReaderMain").appendChild(e), e.innerHTML = "<div id='_left_chapter_' style='display:table;font-size:25px;position:absolute;left:0px;top:0px;width:25%;height:100%;background-color:rgba(255,0,0,0.5);color:white;'><span id='_left_chapter_text_' style='vertical-align: middle; display: table-cell;' ></span></div>", e.innerHTML += "<div style=' display: table-cell; width: 50%; height: 100%; position: absolute; left: 25%;'>" + formatStr("<input type='button' id='Reload' style='font-size:25px;position:absolute;top:25%;left:30%;' value='%s' /><label style='position:absolute;top:30%;left:20%;background-color:black;color:white;'><input  type='checkbox' id='VerticalWritting'/>%s</label><div style='font-size:25px;position:absolute;top:35%;left:20%;background-color:black;color:white'>%s<span id='currentPage'></span></div><div style='font-size:25px;position:absolute;top:40%;left:20%;background-color:black;color:white;'>%s<select id='PageJump'></select></div><label style='position:absolute;top:45%;left:20%;background-color:black;color:white;'><input  type='checkbox' id='AnimationEnable'/>%s</label><div style='font-size:25px;position:absolute;top:50%;left:20%;background-color:black;color:white;'>%s<select id='PreloadPages'></select></div>", loc_RELOAD, loc_VERTICALWRITTING, loc_CURRENTPAGE, loc_JUMPTOPAGE, loc_ANIMATIONENABLE, loc_PRELOADPAGENUM) + "</div>", e.innerHTML += "<div id='_right_chapter_' style='display:table;font-size:25px;position:absolute;left:75%;top:0px;width:25%;height:100%;background-color:rgba(255,0,0,0.5);color:white;'><span id='_right_chapter_text_' style='vertical-align: middle; display: table-cell;' ></span></div>", e.innerHTML += "<div style='font-size:25px;position:absolute;top:90%;left:30%;background-color:black;color:white;'>Version 0.11.10.31.18</div>", e.addEventListener("webkitTransitionEnd", function() {
                    this.style.display = this.enable ? "inline" : "none"
                }, !1);
                var f = function() {
                    var a, b, c, d;
                    VerticalWritting ? (a = $_("_left_chapter_"), b = $_("_left_chapter_text_"), c = $_("_right_chapter_"), d = $_("_right_chapter_text_")) : (a = $_("_right_chapter_"), b = $_("_right_chapter_text_"), c = $_("_left_chapter_"), d = $_("_left_chapter_text_"));
                    var e = getNextChapter();
                    e ? (b.innerHTML = formatStr(loc_NEXTCHAPTER, e.text), a.onclick = function() {
                        location.href = e.href
                    }, a.style.visibility = "visible") : (b.innerHTML = "", a.onclick = null, a.style.visibility = "hidden");
                    var f = getPrevChapter();
                    f ? (d.innerHTML = formatStr(loc_PREVCHAPTER, f.text), c.onclick = function() {
                        location.href = f.href
                    }, c.style.visibility = "visible") : (d.innerHTML = "", c.onclick = null, c.style.visibility = "hidden")
                };
                $_("VerticalWritting").checked = VerticalWritting, $_("VerticalWritting").onclick = function() {
                    VerticalWritting = !VerticalWritting, f()
                }, $_("Reload").onclick = function() {
                    $___()
                };
                for (var g = 0; g < getPageCount(); ++g) {
                    var h = _document.createElement("option");
                    h.innerHTML = g + 1, h.value = g, $_("PageJump").appendChild(h)
                }
                $_("PageJump").onchange = function() {
                    c_page = parseInt($_("PageJump").value, 10), div_imgs[c_page].focusMe(), i(!1)
                }, $_("AnimationEnable").checked = !!configuration.SmoothAnimation, $_("AnimationEnable").onclick = function() {
                    setConfig("SmoothAnimation", this.checked)
                };
                for (var g = 2; MAXPRELOADPAGENUM >= g; ++g) {
                    var h = _document.createElement("option");
                    h.innerHTML = g, h.value = g, $_("PreloadPages").appendChild(h)
                }
                $_("PreloadPages").value = configuration.PreloadPages, $_("PreloadPages").onchange = function() {
                    var a = parseInt($_("PreloadPages").value, 10);
                    setConfig("PreloadPages", a), div_imgs[c_page].focusMe()
                };
                var i = function(a) {
                        e.style.opacity = a ? 0 : 1, e.style.display = "inline", e.enable = a, setTimeout(function() {
                            e.style.opacity = e.enable ? 1 : 0
                        }, 0), a && f()
                    },
                    j = _document.createElement("div");
                j.style.cssText = "font-size:25px;visibility:hidden;position:absolute;display:table;left:0px;top:0px;width:100%;height:100%;overflow-x:hidden;overflow-y:hidden;z-index:20;background-color:rgba(0,0,0,0.6);", j.innerHTML = formatStr("<div style='font-size:25px;position:relative;display:table-cell;vertical-align:middle; text-align:center'><div style='display:inline-block;background-color:black;color:white;'>%s</div></div>", Landscape ? loc_LANDSCAPEWARNING : loc_PORTRAITWARNING), j.className = "iReader", _document.body.appendChild(j);
                var k = function() {
                    var a = !0;
                    if (_window.hasOwnProperty("orientation")) switch (_window.orientation) {
                        case 0:
                        case 180:
                            a = !Landscape;
                            break;
                        case 90:
                        case -90:
                            a = Landscape
                    }
                    a ? ("hidden" !== j.style.visibility && (j.style.visibility = "hidden"), j.enable = !1) : ("visible" !== j.style.visibility && (j.style.visibility = "visible"), j.enable = !0), window.scrollTo(0, 0)
                };
                _window.onorientationchange = k, k(), setInterval(k, 2500), _window.onresize = function() {
                    for (var a = 0; a < div_imgs.length; ++a) div_imgs[a].tImg.setTransform && div_imgs[a].tImg.setTransform()
                };
                var l = function() {
                        return div_imgs[c_page].tImg.pageWidth <= _window.innerWidth ? !1 : div_imgs[c_page].setToRight ^ VerticalWritting ? (div_imgs[c_page].setToRight = VerticalWritting, div_imgs[c_page].tImg.setTransform(), configuration.SmoothAnimation && (div_imgs[c_page].tImg.style.webkitTransitionProperty = "-webkit-transform"), !0) : !1
                    },
                    n = function() {
                        return div_imgs[c_page].tImg.pageWidth <= _window.innerWidth ? !1 : div_imgs[c_page].setToRight ^ !VerticalWritting ? (div_imgs[c_page].setToRight = !VerticalWritting, div_imgs[c_page].tImg.setTransform(), configuration.SmoothAnimation && (div_imgs[c_page].tImg.style.webkitTransitionProperty = "-webkit-transform"), !0) : !1
                    },
                    c = function() {
                        if (VerticalWritting) {
                            if (n()) return
                        } else if (l()) return;
                        --c_page, 0 > c_page ? (c_page = 0, i(!0)) : (div_imgs[c_page].focusMe(!0), configuration.SmoothAnimation && (div_imgs[c_page + 1].style.webkitTransitionProperty = "-webkit-transform", div_imgs[c_page + 1].style.visibility = "visible"))
                    },
                    b = function() {
                        if (VerticalWritting) {
                            if (l()) return
                        } else if (n()) return;
                        ++c_page, c_page >= div_imgs.length ? (c_page = div_imgs.length - 1, i(!0)) : (div_imgs[c_page].focusMe(), configuration.SmoothAnimation && (div_imgs[c_page - 1].style.webkitTransitionProperty = "-webkit-transform", div_imgs[c_page - 1].style.visibility = "visible"))
                    },
                    o = function(a, d) {
                        return j.enable ? void 0 : (a < _window.innerWidth / 4 ? VerticalWritting ? b() : c() : a > 3 * _window.innerWidth / 4 ? VerticalWritting ? c() : b() : i(!0), !1)
                    },
                    p = function(a, b) {
                        return j.enable ? void 0 : "DIV" === b.tagName ? (i(!1), !1) : void 0
                    }; - 1 != navigator.userAgent.indexOf("iPad") || -1 != navigator.userAgent.indexOf("Android") ? (d.ontouchstart = function(a) {
                    return o(a.touches[0].pageX, a.target)
                }, e.ontouchstart = function(a) {
                    return p(a.touches[0].pageX, a.target)
                }) : (d.onmousedown = function(a) {
                    o(a.pageX, a.target)
                }, e.onmousedown = function(a) {
                    p(a.pageX, a.target)
                })
            } else {
                for (m.content = "width=device-width,initial-scale=1.0,maximum-scale=1.5,minimum-scale=0.25", _document.getElementsByTagName("head")[0].appendChild(m), _document.body.innerHTML = "", g = 0; g < getPageCount(); ++g) {
                    var a = _document.createElement("div");
                    a.style.cssText = "visibility:hidden;position:absolute;left:0px;top:0px;", a.page = g, a.tImg = new Image, a.tImg.style.cssText = "position:absolute;left:0px;top:0px;", a.appendChild(a.tImg), a.unloaded = !0, a.eraseImg = function() {
                        this.unloaded || (this.unloaded = !0, this.tImg.src = emptyImageSrc)
                    }, a.loadImg = function(a) {
                        var b = this,
                            c = function() {
                                VerticalWritting ? setTimeout(function() {
                                    _window.scrollTo(b.tImg.width - innerWidth, 0)
                                }, 0) : setTimeout(function() {
                                    _window.scrollTo(0, 0)
                                }, 0)
                            };
                        return this.unloaded ? (this.unloaded = !1, this.tImg.onload = function() {
                            a && c(), this.onload = null
                        }, void setTimeout(function() {
                            b.tImg.flink || (b.tImg.flink = getImgURL(b.page)), b.tImg.src = b.tImg.flink
                        }, 0)) : void(a && c())
                    }, a.focusMe = function() {
                        setCurrentPage(this.page), div_imgs[this.page].style.visibility = "visible", div_imgs[this.page].loadImg(!0);
                        for (var a = this.page + 1; a < div_imgs.length; ++a) div_imgs[a].style.visibility = "hidden", a > this.page + configuration.PreloadPages ? div_imgs[a].eraseImg() : div_imgs[a].loadImg(!1);
                        for (var a = this.page - 1; a >= 0; --a) div_imgs[a].style.visibility = "hidden", a < this.page - 2 ? div_imgs[a].eraseImg() : div_imgs[a].loadImg(!1)
                    }, _document.body.appendChild(a), div_imgs.push(a)
                }
                var b = function() {
                        ++c_page, c_page >= div_imgs.length ? (c_page = div_imgs.length - 1, alert("Last page already")) : div_imgs[c_page].focusMe()
                    },
                    c = function() {
                        --c_page, 0 > c_page ? (c_page = 0, alert("First page already")) : div_imgs[c_page].focusMe()
                    };
                _document.onmouseup = function(a) {
                    if (a.target !== _document.documentElement)
                        if (a.offsetX || (a.offsetX = a.layerX, a.offsetY = a.layerY), a.offsetX - scrollX < innerWidth / 3) VerticalWritting ? b() : c();
                        else if (a.offsetX - scrollX > 2 * innerWidth / 3) VerticalWritting ? c() : b();
                    else {
                        var d = parseInt(prompt("jump to 1-" + div_imgs.length + " page", c_page + 1), 10);
                        d && (d > div_imgs.length ? alert("maximum " + div_imgs.length + " pages!") : (c_page = d - 1, div_imgs[d - 1].focusMe()))
                    }
                }
            }
            c_page = getCurrentPage(), div_imgs[c_page].focusMe()
        }, 0)
    })();
    else
        for (var ifs = document.getElementsByTagName("iframe"), i = ifs.length - 1; i >= 0; --i) ifs[i].parentNode.removeChild(ifs[i])
