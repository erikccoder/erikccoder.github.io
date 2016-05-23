---
title: Windsor x Peppa Pig Christmas
tags: 
    - portfolio 
    - openframeowrks
    - unity
    - opticalflow 
    - osc
    - syphon
    - spout
---
![Cover][img_t]

Interactive installation for shoppers in [Windsor][ref_w](a HK mall) play with [Peppa][ref_p] & her friends.

[[MORE]]

People could stand in front of Big TV wall and interactive with the Peppa, her friends and the Christmas gifts by using [Motion Detection](#motion_detection) technology.

## Motion Detection ##

Everything with detecting area near the TV wall will be captured and tracked by a HD camera. An application developed with [openFrameworks][ref_of] was checking the objects and calculate their motion frame by frame. Shoppers could interact with Peppa & her friends through the motions detected by the system. Additional interactive gifts, which falling down from the top of TV wall, could be hit by shoppers too. [Optical flow][ref_o] was used to implement this system.

![Cover][img_t]


## Visual Parts ##
[Unity 5](ref_unity) was used for giving a life to each characters on the TV wall. Unity is great for creating characters animation. particles effects & physic simulation was used for the interactive falling gifts. The live feed from the HD camera was streamed by [Spout][ref_s] which allows Openframeworks & Unity to share frames .

## Photo Taking ##

An digital photo of the shoppers and the characters will be composited and saved on the event website. Shoppers could scan [QR code][ref_qr] to get the photo and share on Facebook or other social media.

## Networking ##
Open Sound Control ([OSC][ref_osc]) was the gateway and used for interprocess communication ([IPC][ref_ipc]) between the apps. It's fast & easy to use.


> Open Sound Control (OSC) is a protocol for networking sound synthesizers, computers, and other multimedia devices for purposes such as musical performance or show control. OSC's advantages include interoperability, accuracy, flexibility and enhanced organization and documentation. [WIKIPEDIA][ref_osc]


## Cancelled Feature ##

Shoppers, at first, could play with Peppa & her friends like [Hide-and-seek][ref_hns]. Peppa & her friends would avoid the shoppers and move to opposite direct when they were coming close. This idea was implemented but was cut off.

Project Page: [430 Limited][ref_4]


[ref_of]: http://openframeworks.cc

[ref_w]: http://windsorhouse.hk/

[ref_p]: https://en.wikipedia.org/wiki/Peppa_Pig

[img_t]: http://erikccoder.github.io/img/windsor-peppa-pig-christmas-02.jpg

[ref_4]: http://430.com.hk/windsor-x-peppa-pig-christmas-new-campaign/

[ref_o]: https://en.wikipedia.org/wiki/Optical_flow

[ref_hns]: https://en.wikipedia.org/wiki/Hide-and-seek

[ref_unity]: https://en.wikipedia.org/wiki/Unity_(game_engine)

[ref_osc]: https://en.wikipedia.org/wiki/Open_Sound_Control

[ref_s]: http://spout.zeal.co

[ref_ipc]: https://en.wikipedia.org/wiki/Inter-process_communication

[ref_qr]: https://en.wikipedia.org/wiki/QR_code

[img_play]: http://erikccoder.github.io/img/peppa_play.jpg
