===========================================================================
categories: 'web'
date: 2016-04-06 11:29
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'Future-proofing Python 2 code'
===========================================================================

Let's say you've inherited a Python 2 web app. You've already tried Python 3 and you know it's better than nutella on oreos. You know you need to switch. You already have that on your roadmap. But before that happens, there's this task that requires you to build a fresh new module and deploy it to your existing servers.

Deploying both Python versions to production is not feasible, since the new module needs to interact with some of the old code. So what do you do? You future-proof the hell out of that Python 2 code!

You quickly head to the <a href="https://docs.python.org/2/library/__future__.html" target="_blank">\_\_future\_\_ documentation page</a> and add imports for everything on the list:


//code python
from __future__ import nested_scopes
from __future__ import generators

# 5 / 2 == 2.5 instead of 2
from __future__ import division
from __future__ import absolute_import
from __future__ import with_statement

# print('hello') instead of print 'hello'
from __future__ import print_function

# '{}'.format(u'câh') no longer throws an error
# because '{}' is now unicode
from __future__ import unicode_literals
//code


End everything seems right, until you type `str('câh')` like you would do in Python 3 and the whole world comes crashing down. The problem? You're still using Python 2 builtins. `str` is still a Python 2 string and as such, cannot contain unicode. The solution? Install <a href="http://python-future.org/" target="_blank">python-future</a>.


//code python
from __future__ import unicode_literals
from builtins import str

# works like a charm
str('câh')
//code


And again, everything seems right, until you type `type('something') is str` and it returns `False` and you lose it and flip the table in sheer frustration.

(╯°□°）╯︵ ┻━┻)

After you set your table back in place

┬─┬ノ(ಠ_ಠノ)

you decide to dig through the whole thing to see what happened.


//code python
from __future__ import unicode_literals
from builtins import *

type(str)
<class 'future.types.newstr.BaseNewStr'>
type('something')
<type 'unicode'>

# so it makes sense that
type('something') is not str

# and in case you're wondering, yes, this happens for all literals
type(dict)
<class 'future.types.newdict.BaseNewDict'>
type({})
<type 'dict'>

# what you need to do instead is
isinstance('something', str)
True
//code

You probably won't need to add all the \_\_future\_\_ imports, as most of them have been added to Python > 2.6 and, depending on your use case, you might need to add some <a href="http://python-future.org/imports.html#standard-library-imports" target="_blank">standard library</a> or <a href="http://python-future.org/imports.html#aliased-imports" target="_blank">aliased</a> imports.

Putting it all together:


//code python
# <future-proof description="this can be removed once we switch to Python 3">
# -*- coding: utf-8 -*-

from __future__ import division, absolute_import, print_function, unicode_literals
from builtins import *
from future.builtins.disabled import *

# WARNING: the builtins import changes the type of builtins
# i.e. type(str) == <class 'future.types.newstr.BaseNewStr'>
# this is a potential pitfall as literal types are unchanged
# i.e. type('') == <type 'str'>
# resulting in unexpected behaviors such as
# type('') is str == False
# Use isinstance('', str) instead.

# </future-proof>
//code
