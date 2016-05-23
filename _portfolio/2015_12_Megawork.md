---
title World We Made Pop-up Store @ Shanghai
tags: 
    - portfolio 
    - openframeowrks 
    - creativecoding 
    - iOS 
    - reactnative 
    - php 
    - http 
    - vidoeprocessing 
    - ae
---


![top][img_top]


This is an interactive installation for shoppers taking a snapshot and transforming it into a stylish video.

[[MORE]]

The client wanted his shopers look and feel like trendy fashion lovers during their shopping experiences. So this installation providing such function for them.

![setup][img_setup]


The original idea for the system was included two main parts [Photo Booth](#photo_booth) and [Video Processing & Display](#video_prces). These two parts were connected to a router and communicating each other through [HTTP][ref_http]. 


![Imgur][gif_photo_booth]

<a name="photo_booth"></a>

## Photo Booth ##

This part is photo taking for users. It was an iPad with an App developed with [React Native][ref_react]. The snapshot will send directly to sub-system of [Video Processing & Display](#video_prces) after inputing necessary information and user's confirmations.

![Imgur][gif_template]

<a name="video_prces"></a> 
## Video Processing & Display ##

A Mac mini was decided to use for processing the videos from photos. The main software was developed with [openFrameworks][ref_of]. Thanks for our designer **Fai** who made the great video template for the softwares to generate the stylish video.


## Other Feature ##

Video would be sent to shoppers as attachment in a email.  This can let them have a backup and for further sharing. Twitter, Instagram, Facebook etc. This app is developed with [JavaScript for Automation (JXA)][ref_jax].



Project Page: [430 Limited][ref_430]


[ref_http]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[ref_react]: https://facebook.github.io/react-native/
[ref_of]: http://openframeworks.cc

[ref_430]: http://430.com.hk/world-we-made-pop-up-store-shanghai/

[img_top]: http://erikccoder.github.io/img/Megawork_top.jpg

[img_setup]: http://erikccoder.github.io/img/megawork_setup.jpg

[gif_photo_booth]: http://i.imgur.com/2G7yPlt.gif

[gif_template]: http://i.imgur.com/glIUkpT.gif

[ref_jax]:https://developer.apple.com/library/mac/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/Introduction.html