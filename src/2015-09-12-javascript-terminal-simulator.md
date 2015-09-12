===========================================================================
categories: 'web'
date: 2015-09-12 22:20
description: "A few days ago I received a call from Marius Corîci of CTF365.com, who had just run into hackertyper.com and, being rather amused and excited by what he saw, asked me to come up with a similar concept for their sign-up page"
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'JavaScript terminal simulator'
===========================================================================

A few days ago I received a call from Marius Corîci of [CTF365.com](https://ctf365.com/), who had just run into [hackertyper.com](http://www.hackertyper.com/) and, being rather amused and excited by what he saw, asked me to come up with a similar concept for their sign-up page.

After a bit of fumbling around the jQuery API, I gathered all the event handlers that I needed and got to work. At first I was tempted to use an `<input>` or `<textarea>` tag, but after realizing that there was no way for me to hide the cursors that those come with, I figured out that I'll just have to listen to `$(document).on('keypress')` events and manually add the content to the page. As I was slowly adding support for the various commands (I won't spoil you by mentioning which ones), it slowly dawned upon me: there's no way this is going to work on mobile. Why? No. Keyboard.

Before you wonder off in that direction, allow me to stop you in your tracks: no, there's no way of triggering the virtual keyboard from JavaScript, because that would be annoying as fkuc. And no, you can't get the keyboard to show by focusing an input tag. Unless, (and this is the important part) it's in response to a user-triggered event. What's that? Force the user to tap the document, focus an off-page input tag and receive a keyboard? Bingo! Demo below:

<a href="demo.html"><img class="img-full" src="terminal-simulator.png" alt="JavaScript terminal simulator"></a>
