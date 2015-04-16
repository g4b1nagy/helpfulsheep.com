===========================================================================
categories: 'web'
date: 2015-03-25 23:21
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'Converting SVG fonts to... SVG'
===========================================================================

If you've ever had to deal with [Bootstrap](http://getbootstrap.com/), chances are you've run into the [glyphicons-halflings-regular.svg](https://github.com/twbs/bootstrap/blob/master/fonts/glyphicons-halflings-regular.svg) file. If not, let me sum things up: web fonts can be served to the browser in different formats, SVG being one of them. Now, you might expect this to be a run of the mill, ordinary SVG file, but if you try and open it in Inkscape or Google Chrome, it just renders as a<!--more--> blank page.

A few days ago, a [friend](http://danielmuntean.com/) had to do some design work on a Bootstrap based website and needed a scalable version of the icons. Because people have the horrible habit of needing food and shelter, the free version of the [Glyphicons icon pack](http://glyphicons.com/) only offers things in `.png` format. After suggesting he use the `.ttf` file and realizing that it's probably a pain to have to look up the glyph codes every time, I thought that there must be something to that pesky SVG file.

<a href="inkscape-svg-font-editor.png"><img class="img-full" src="inkscape-svg-font-editor.png" alt="Inkscape SVG font editor"></a>

<p class="caption">can has paths?</p>

Since Inkscape's SVG font editor only allows you to save your paths as glyphs and not the other way around, I was left with well, nothing. But in this case, nothing was still something because SVG files are essentially text. And sure enough, every glyph had a corresponding SVG element. Extracting the paths was therefore a matter of replacing 'glyph' with 'path', adding a surrounding svg tag and flipping the whole thing vertically.

//code xml
<glyph unicode="&#x270f;" d="M1011 1210q19 0 33 -13l153 -153q13 -14 13 -33t-13 -33l-99 -92l-214 214l95 96q13 14 32 14zM1013 800l-615 -614l-214 214l614 614zM317 96l-333 -112l110 335z" />

<!-- therefore becomes -->

<?xml version="1.0" standalone="no"?>
<svg width="1500px" height="1500px" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path transform="scale(1, -1) translate(0, -1500)" unicode="&#x270f;" d="M1011 1210q19 0 33 -13l153 -153q13 -14 13 -33t-13 -33l-99 -92l-214 214l95 96q13 14 32 14zM1013 800l-615 -614l-214 214l614 614zM317 96l-333 -112l110 335z" />
</svg>
//code

And because nothing should be done twice when you can write scripts, voila!

//code python
import sys

if len(sys.argv) < 2:
  print 'Usage: python {} webfont-file.svg'.format(sys.argv[0])
  sys.exit()
with open(sys.argv[1], 'r') as r:
  lines = r.read().split('\n')
  glyphs = [x for x in lines if '<glyph' in x]
  # for every glyph element in the file
  for i in range(0, len(glyphs)):
    with open(str(i + 1).rjust(3, '0') + '.svg', 'w') as w:
      w.write('<?xml version="1.0" standalone="no"?>\n')
      w.write('<svg width="1500px" height="1500px" version="1.1" xmlns="http://www.w3.org/2000/svg">\n')
      # replace 'glyph' with 'path' and flip vertically
      w.write(glyphs[i].replace('<glyph', '<path transform="scale(1, -1) translate(0, -1500)"') + '\n')
      w.write('</svg>')
//code

The best part? You can convert your existing `.ttf` fonts to `.svg` using services such as [Font Squirrel's webfont generator](http://www.fontsquirrel.com/tools/webfont-generator) and then extract the SVG paths with the script above.

But before you start selling the SVG version of Helvetica online, make sure to check the licensing info. Also, the people who took the time to design these things cannot pay the bills with kudos, so do consider buying the fonts and icon packs to support their work.
