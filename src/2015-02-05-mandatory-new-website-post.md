===========================================================================
categories: 'ramblings'
date: 2015-02-05 01:56
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'Mandatory new website post'
===========================================================================

It's been 3 years, 3 months and 28 days since this site first went online on 8 Oct 2011. But until today, you couldn't have told by looking at it. 92,191 pageviews later and my website was still the same old badly put together WordPress powered fart.

I knew I had to update it. I had started working on it at least 3 times in the past. Luckily, a few days ago I finally snapped and now it's finally done :)

Running [webpagetest.org](http://www.webpagetest.org/) on the landing page before and after the redesign shows that

* load time `6.566s` &rarr; `1.116s` &rArr; `5.88 times faster`

* page size `801 KB` &rarr; `67 KB` &rArr; `11.95 times smaller`

* requests `35` &rarr; `11` &rArr; `3.18 times fewer`

Now before I pat myself on the back and shake my hand vigorously, allow me to walk you through what I did to get to these results:

* throw out WordPress (it's a hell of a lot more than what I needed for this website)

* write the minimum amount of HTML and CSS for the design

* switch to [helpful-site](https://github.com/g4b1nagy/helpful-site) (static site generator with css and js minification)

* run every png image on the site through [tinypng.com](https://tinypng.com/)

It might now seem like much, but they all add up. And with more and more people surfing the web via smartphone, these numbers really matter.

Here's to a better experience on the web and less excuses to write out new posts!

`:) easter eggs included (:`
