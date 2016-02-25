===========================================================================
categories: 'web'
date: 2016-02-25 00:46
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'Clicking a Flash object with Selenium'
===========================================================================

The problem: the internet connection back home keeps dropping. Stone the ISP or burn the router? The solution: write a Selenium script to run a speed test every 15 minutes and save the results as screenshots.

Should be done in 15 minutes, right? Wrong! Apparently, this is 2004, and my ISP's <a href="http://www.rcs-rds.ro/internet-digi-net/testeaza-ti-viteza" target="_blank">speed test page</a> still uses Flash<!--more-->. Fkuc you, Ookla, fkuc you!


## Approach #0 ##

Desperately try to click through the entire Flash iframe thing.

<a href="iframe-with-flash.png"><img class="img-full" src="iframe-with-flash.png" alt="iframe with Flash"></a>

<p class="caption">iframes and Flash... this is gonna' suck...</p>

//code python
import time

from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains


# Firefox ain't got no Flash
browser = webdriver.Chrome()
actions = ActionChains(browser)
browser.get('http://www.rcs-rds.ro/internet-digi-net/testeaza-ti-viteza')
# wait for the page to load
time.sleep(10)
element = browser.find_element_by_css_selector('iframe')
# click all the things!
for i in range(1, 720, 30):
    for j in range(1, 800, 30):
        print('clicking at {}, {}'.format(i, j))
        # I quote: "move the mouse by an offset of the specified element"
        actions.move_to_element_with_offset(element, i, j).click().perform()
//code

Obviously, this fails horribly, and I end up with 97 opened tabs in Chrome.


## Approach #1 ##

Navigate to the <a href="http://speedtest1.rcs-rds.ro/" target="_blank">actual iframe</a> and snoop around the code.


//code javascript
function toJava(jsmethod,args) {
 var e = document.getElementById('VoipApplet');
 e.fromJS(jsmethod,args);
}
//code


<p class="caption">Java and Applets... nope!</p>


## Approach #2 ##

Google a lot and find out there's no way to interact with Flash from JavaScript. Cry. Turns out that Selenium uses the browser's JavaScript API behind the scenes, while Flash objects run in their own environment. Bummer.


## Approach #3 ##

Find a GUI automation library for Python and click the damn thing through the OS. Grab the <a href="https://pyautogui.readthedocs.org/en/latest/" target="_blank">first thing that pops up on Google</a> and begin Ubuntu 14.04 dependency hell.

//code bash
mkdir speed-tests
cd speed-tests/
virtualenv -p $(which python3) .venv
source .venv/bin/activate
pip install pyautogui
# ImportError: No module named 'Xlib'
sudo apt-get install python3-xlib
# ImportError: No module named 'Xlib'

# become frustrated
# realize that the Xlib module is not visible from virtualenv
# give up on virtualenv and install everything globally
# never a good idea, but it's already 01:00 AM and I still have to go to work tomorrow

# Google "how to install python 3 packages globally"
sudo apt-get install python3-pip
sudo pip3 install pyautogui
# No module named '_tkinter', please install the python3-tk package
sudo apt-get install python3-tk
sudo pip3 install pyautogui
# ImportError: No module named 'PIL'
sudo pip3 install pillow
# ValueError: jpeg is required unless explicitly disabled using --disable-jpeg, aborting
sudo apt-get install libjpeg8-dev
sudo pip3 install pillow
sudo pip3 install pyautogui
//code

Surprisingly, getting the whole thing to work on Windows was just a matter of `pip install pillow pyautogui`.


## Finished product ##

//code python
import datetime
import time

import pyautogui
from selenium import webdriver


while True:
    print(datetime.datetime.now())
    try:
        # Firefox ain't got no Flash
        browser = webdriver.Chrome()
        browser.maximize_window()
        # drop the pleasantries, just open the Flash object
        browser.get('http://speedtest1.rcs-rds.ro/netgauge.swf?v=3.0')
        # wait for the page to load
        time.sleep(1 * 60)
        # make sure the browser is in focus
        browser.maximize_window()
        time.sleep(1 * 60)
        # click the start test button
        pyautogui.moveTo(683, 333)
        pyautogui.click()
        # wait for the test to finish
        time.sleep(8 * 60)
        browser.save_screenshot(datetime.datetime.now().strftime('rds__%Y-%m-%d__%H.%M.png'))
        browser.close()
        time.sleep(5 * 60)
    except Exception as e:
        print e.message
//code

I really hope you enjoyed this, 'cause I sure didn't!
