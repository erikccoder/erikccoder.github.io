[Grab Video Link](getVideo.js)
===

bookmarklet code:

```
javascript:(function()%7Bif%20(!document.getElementById(%22GrabVideo%22))%20%7Bvar%20a%20%3D%20document.createElement(%22script%22)%3Ba.setAttribute(%22type%22%2C%20%22text%2Fjavascript%22)%2C%20a.setAttribute(%22charset%22%2C%20%22utf-8%22)%2C%20a.src%20%3D%20%22%2F%2Ferikccoder.github.io%2Ftools%2FGrabVideo.js%3F%22%20%2B%20(new%20Date).getTime()%2C%20a.id%20%3D%20%22iPadReader%22%2C%20document.head.appendChild(a)%7D%7D)()
```

How to use:
======

  1. You play and stop html video.
  2. script will display all posible links eg. <video> <source> <iframe>
  3. click the link that is most like the video link
  4. script will this link directly on next run. 
  5. repeeat 0 to 2 until you get the video link
  6. add "?ek=clear" to clear settings


[Comic Reader](comicReader.js)
===
```
javascript:(function()%7Bif(!document.getElementById(%22iPadReader%22))%7Bvar%20a%3Ddocument.createElement(%22script%22)%3Ba.setAttribute(%22type%22%2C%22text%2Fjavascript%22)%2Ca.setAttribute(%22charset%22%2C%22utf-8%22)%2Ca.src%3D%22%2F%2Ferikccoder.github.io%2Ftools%2FcomicReader.js%3F%22%2B(new%20Date).getTime()%2Ca.id%3D%22iPadReader%22%2Cdocument.head.appendChild(a)%7D%7D)()
```

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

