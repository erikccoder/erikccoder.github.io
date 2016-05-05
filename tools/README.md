PageZipper
===

bookmarklet code:

```javascript
javascript:(function()%7Bif(window%5B%27pgzp%27%5D)%7B_pgzpToggleBookmarklet()%3B%7Delse%7Bwindow._page_zipper_is_bookmarklet%3Dtrue%3Bwindow._page_zipper%3Ddocument.createElement(%27script%27)%3Bwindow._page_zipper.type%3D%27text/javascript%27%3Bwindow._page_zipper.src%3D%27//erikccoder.github.io/tools/PageZipper.js%27%3Bdocument.getElementsByTagName(%27head%27)%5B0%5D.appendChild(window._page_zipper)%3B%7D%7D)()%3B
```

