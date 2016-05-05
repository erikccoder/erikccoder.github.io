[PageZipper](http://www.printwhatyoulike.com/pagezipper)
===

bookmarklet code:

```
javascript:(function()%7Bif(window%5B%27pgzp%27%5D)%7B_pgzpToggleBookmarklet()%3B%7Delse%7Bwindow._page_zipper_is_bookmarklet%3Dtrue%3Bwindow._page_zipper%3Ddocument.createElement(%27script%27)%3Bwindow._page_zipper.type%3D%27text/javascript%27%3Bwindow._page_zipper.src%3D%27//erikccoder.github.io/tools/PageZipper.js%27%3Bdocument.getElementsByTagName(%27head%27)%5B0%5D.appendChild(window._page_zipper)%3B%7D%7D)()%3B
```

[iPad Online Manga Reader](http://yujianrong.bitbucket.org/JsTool/iPadMangaReader/)
===

bookmarklet code:
```
javascript:(function(){if(!document.getElementById("iPadReader")){var a=document.createElement("script");a.setAttribute("type","text/javascript"),a.setAttribute("charset","utf-8"),a.src='//erikccoder.github.io/tools/iPadMangaReader.js?'+((new Date()).getTime()),a.id="iPadReader",document.head.appendChild(a)}})();
```

