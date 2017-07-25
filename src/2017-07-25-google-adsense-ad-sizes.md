===========================================================================
categories: 'web'
date: 2017-07-25 23:12
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'Google AdSense ad sizes'
===========================================================================

<style>
  .img-full {
    border: 1px solid #ddd;
  }
</style>

Sometimes, you find yourself in the middle of nowhere, and sometimes, in the middle of nowhere, you find yourself... trying to fit ads into your website. Sure, Google offers a list of <a href="https://support.google.com/adsense/answer/6002621?hl=en" target="_blank">AdSense ad sizes</a>, but unless you're some sort of pixel wizard, chances are you're going to have a hard time imagining what a 234x60 block looks like. They've also got pictures of the top performing ad sizes, which is nice... except for the fact that they're a tiny bit off, which just grinds my gears.

<img class="img-full" src="adsense-antialiasing.png" alt="Google AdSense antialiasing">
<p class="caption">worst 300x250 ever!</p>

So, as always, we're off to Python land to generate some pictures of our own. I didn't include the regional ad sizes, but the code's below, so feel free to update it as needed.

And in case you just want to download all the pictures, here's a handy [download link](adsense-ads.zip).


<img src="300x250.png" alt="Google AdSense ad">
<br>
<img src="336x280.png" alt="Google AdSense ad">
<br>
<img src="728x90.png" alt="Google AdSense ad">
<br>
<img src="300x600.png" alt="Google AdSense ad">
<br>
<img src="320x100.png" alt="Google AdSense ad">
<br>
<img src="320x50.png" alt="Google AdSense ad">
<br>
<img src="468x60.png" alt="Google AdSense ad">
<br>
<img src="234x60.png" alt="Google AdSense ad">
<br>
<img src="120x600.png" alt="Google AdSense ad">
<br>
<img src="120x240.png" alt="Google AdSense ad">
<br>
<img src="160x600.png" alt="Google AdSense ad">
<br>
<img src="300x1050.png" alt="Google AdSense ad">
<br>
<img src="970x90.png" alt="Google AdSense ad">
<br>
<img src="970x250.png" alt="Google AdSense ad">
<br>
<img src="250x250.png" alt="Google AdSense ad">
<br>
<img src="200x200.png" alt="Google AdSense ad">
<br>
<img src="180x150.png" alt="Google AdSense ad">
<br>
<img src="125x125.png" alt="Google AdSense ad">

PS: you'll need to

//code bash
virtualenv -p $(which python3) venv
source venv/bin/activate
pip install pillow
//code

in order for the imports to work.

//code python
from PIL import Image, ImageDraw, ImageFont


ad_sizes = [
    ('300x250', 'medium rectangle'),
    ('336x280', 'large rectangle'),
    ('728x90', 'leaderboard'),
    ('300x600', 'half page'),
    ('320x100', 'large mobile banner'),
    ('320x50', 'mobile leaderboard'),
    ('468x60', 'banner'),
    ('234x60', 'half banner'),
    ('120x600', 'skyscraper'),
    ('120x240', 'vertical banner'),
    ('160x600', 'wide skyscraper'),
    ('300x1050', 'portrait'),
    ('970x90', 'large leaderboard'),
    ('970x250', 'billboard'),
    ('250x250', 'square'),
    ('200x200', 'small square'),
    ('180x150', 'small rectangle'),
    ('125x125', 'button'),
]
font = ImageFont.truetype('DejaVuSans.ttf', 14)
for size in ad_sizes:
    ad_width, ad_height = [int(x) for x in size[0].split('x')]
    ad_text = '{}\n{}'.format(size[0], size[1])
    image = Image.new('RGB', (ad_width, ad_height), (224, 102, 102))
    draw = ImageDraw.Draw(image)
    text_width, text_height = draw.textsize(ad_text, font=font)
    draw.multiline_text(((ad_width - text_width) / 2, (ad_height - text_height) / 2), ad_text, font=font, align='center', fill=(255, 255, 255))
    image.save('{}.png'.format(size[0]))
//code
