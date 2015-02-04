===========================================================================
categories: 'goodies'
date: 2012-01-20 04:43
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'HTML password manager'
===========================================================================

If you spend a lot of time online, and since you even managed to end up on this page, I'm assuming you do, you've surely had this problem before: a freaking gazillion usernames and passwords to keep track of. Sure there's a remember password option in most browsers, and sure there are browser extensions like [RoboForm](http://www.roboform.com/) and stand-alone password managers like [KeePassX](http://sourceforge.net/projects/keepassx/), but wouldn't it be nice to have a simple, regular text file ... with a search option ... maybe even view it in a browser, since you're already there? I thought it would be awesome, so I came up with this little HTML file:

<div class="img-container">
  <a href="accounter-01.png"><img src="accounter-01.png" alt="HTML password manager"></a>
  <a href="accounter-02.png"><img src="accounter-02.png" alt="HTML password manager"></a>
</div>

Everything's there: CSS, JavaScript, even the favicon - all embedded. There's no copy to clipboard option, since JavaScript doesn't allow that, but you do get a one-click-select-text feature and a left Alt query reset. Ok, I'll shut up now. Just try the [DEMO](demo.html) if you're not convinced.

To add your own info, just open the file in a text editor and

//code html
<table>
  <tr>
    <th colspan="3"></th>
  </tr>
  <tr>
    <!-- enter website address here -->
    <td><a href="http://www.helpfulsheep.com/">helpfulsheep.com</a></td>
    <!-- username here -->
    <td>shawn_the_sheep</td>
    <!-- and password here -->
    <td>spacesheep</td>
  </tr>
  <tr>
    <!-- next account here, and so on -->
    <td><a href="http://www.image-jam.com/">image-jam.com</a></td>
    <td>ijam_welol</td>
    <td>dontvisitthiswebsite</td>
  </tr>
</table>
//code

[DOWNLOAD](HTML%20Password%20Manager.zip)
