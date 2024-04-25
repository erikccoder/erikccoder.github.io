# sendonly
https://erikccoder.github.io/demo/ayame-webrtc/sendonly.html?ayameUrl=ws://rockbreaker.dev/signaling

# recvonly
https://erikccoder.github.io/demo/ayame-webrtc/recvonly.html?ayameUrl=ws://rockbreaker.dev/signaling

# docker command
docker run -p 4000:4000 -p 3000:3000 --rm -it -v "$PWD":/usr/src/myapp -w /usr/src/myapp golang:1.22 bash -c "/usr/src/myapp/bin/ayame"


# docker-compose.yml
```
name: rockbreakers
services:
    ayame:
        image: golang:1.22
        working_dir: /usr/src/myapp
        command: bash -c "(/usr/src/myapp/bin/ayame) || (git clone https://github.com/OpenAyame/ayame.git) && (mv ./ayame/* ./) && (ls -al) && (go install) && make && (make init) && /usr/src/myapp/bin/ayame"
        ports:
            - 3000:3000

```
