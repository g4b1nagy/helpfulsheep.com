===========================================================================
categories: 'web'
date: 2017-05-24 13:50
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'Speeding up Selenium'
===========================================================================

Web testing automation is probably the use case Selenium has become most known for. And for good reason. It allows you to take full control of the browser of your choice and interact with the underlying web page in very reliable ways (think `document.querySelector('h1')` versus parsing out the page's HTML).

But what if you want to use Selenium for something... a little less standard like, I don't know... scraping all the real estate websites in your city? You've probably figured out that you need to install a virtual display server, such as <a href="https://en.wikipedia.org/wiki/Xvfb" target="_blank">Xvfb</a> in order to trick Selenium to run without a graphical interface on a Linux server. You probably know that Chrome(ium) is the fastest browser you can get your hands on. You've also set the `driver.set_page_load_timeout()` to a reasonable value. Where do you go from here?

To find out, I've set up the following test:


//code python
import time

from pyvirtualdisplay import Display
from selenium import webdriver


urls = [
    'http://website.com/relevant-page1',
    'http://website.com/relevant-page2',
    ...
    'http://website.com/relevant-page30',
]
display = Display(visible=0, size=(800, 600))
display.start()
driver = webdriver.Chrome()
start_time = time.time()
for url in urls:
    try:
        driver.get(url)
    except Exception as e:
        print(e)
print(time.time() - start_time)
driver.quit()
display.stop()
//code


To account for any anomalies, I'm running the script 10 times and averaging out the run times. I'm also using servers on 2 different hosting providers, for good measure.



When thinking about page load times, the first thing that comes to mind is: what can I exclude from loading? And the obvious answer is of course ads! You can add extensions to your Selenium browser:


//code python
chrome_options = webdriver.ChromeOptions()
chrome_options.add_extension('/path/to/extension.crx')
driver = webdriver.Chrome(chrome_options=chrome_options)
//code


so I had to try <a href="https://github.com/gorhill/uBlock" target="_blank">uBlock Origin</a>. But then it occurred to me that running the extension makes the browser do more work. What if it ends up slowing it down? Could we block ads in a different way? I had heard about <a href="https://pi-hole.net/" target="_blank">Pi-hole</a> being able to block ads at the DNS level so I wanted to try that out as well. I also did not need any of the pictures, so I wanted to test not loading those as well:


//code python
prefs = {'profile.managed_default_content_settings.images': 2}
chrome_options.add_experimental_option('prefs', prefs)
//code

And in case you're wondering, I'm using:

* Ubuntu 16.04.2 LTS
* Chromium 58.0.3029.110 Built on Ubuntu , running on Ubuntu 16.04
* ChromeDriver 2.27
* uBlock Origin 1.12.4
* Pi-hole 3.0.1

Edit: that space, right before the comma really irks me...

<a href="selenium-performance1.png"><img class="img-full" src="selenium-performance1.png" alt="Selenium performance"></a>

Not very surprising, but blocking ads at the DNS level is faster than running an ad-blocking extension. Also, using both Pi-hole and uBlock Origin does not help.


## Off with his head! ##

If you've been keeping an eye on the Chromium development team, you know that Chromium 58 shipped last month with native support for headless mode on Linux. If you try to add the headless flag to your code though


//code python
chrome_options.add_argument('--headless')
//code


as per the <a href="https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md" target="_blank">instructions page</a> you'll probably end up with


//code bash
selenium.common.exceptions.WebDriverException: Message: unknown error: unrecognized Chrome version: HeadlessChrome/58.0.3029.81
//code


This is because the repository version of ChromeDriver (2.27) cannot handle headless Chromium. And don't waste your time trying out version 2.28, as that won't work either. At the time of writing, 2.29 is the latest version, but you should probably check the <a href="https://sites.google.com/a/chromium.org/chromedriver/" target="_blank">official page</a> and download the latest ChromeDriver to your server. Then it's simply a matter of pointing Selenium to the right path:

//code python
driver = webdriver.Chrome('/path/to/chromedriver', chrome_options=chrome_options)
//code

I wanted to run the exact same tests on the headless version of Chromium as well, but for some reason the browser would just get stuck in loading mode and then time out for one of the websites I was targeting. So I had to run the tests on a subset of the pages


<a href="selenium-performance2.png"><img class="img-full" src="selenium-performance2.png" alt="Selenium performance"></a>

To my surprise, Chromium running behind Xvfb outperformed the headless version. If anyone has any idea why that is, I'd be really happy to know.

And last but not least, the size of your virtual display also matters:

<a href="selenium-performance3.png"><img class="img-full" src="selenium-performance3.png" alt="Selenium performance"></a>
