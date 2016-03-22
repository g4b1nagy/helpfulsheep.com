===========================================================================
categories: 'goodies'
date: 2016-03-22 07:28
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: post.html
title: !!python/unicode 'What git I do last month?'
===========================================================================

We're trying out this new process at work where employee evaluation is a continuous process rather than a once or twice a year event. In order to facilitate this, we need to keep track of our monthly performance. And while I do agree that keeping an eye on what you're doing is a great source of insight (see my other [post about the money](/2015-02-15-where-does-the-money-go/))<!--more-->, it's still a major pain dans le dos.

Thankfully, the bulk of my work is still writing code so naturally, that was the first place to look for data. After a bit of head-scratching, I realized that git should allow me to track 4 things: number of commits, number of files changed, number of insertions and number of deletions. Sure, it's not a perfectly accurate representation of you activity as a programmer, but the data should provide some insight into what type of work motivated you the most, what tasks ground you to a halt, etc.


## Number of commits last month ##

In order to get all the commits from February, for example, we need to instruct git to give us everything that happened `--before` the 1st of March and `--after` the 31th of January. If you only provide the date, though (which is a pitfall I totally did not fall for), git will default to the last moment of the day, meaning you'll also get all the commits that took place up until the 1st of March at 23:59.

//code bash
# me, trying to explain this, SQL-style
git log
    --author="$(git config user.name)"  # I only care about my commits
    --no-merges  # ignore merge commits
    --before=$(date "+%Y-%m-01T00:00")  # before 2016-03-01T00:00
    --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59")  # subtract +%d days and 1 month from the current date i.e. 2016-01-31T23:59
    --reverse  # arrange commits oldest to newest
    | grep commit  # save the lines containing the word "commit"
    | wc -l  # and count them

# one-line version
git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse | grep commit | wc -l

# add it to your git aliases
git config --global alias.clm '!echo $(git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse | grep commit | wc -l) commits last month'

# enjoy
git clm
11 commits last month  # I kinda' slacked off...
//code


## Number of files changed, insertions, deletions ##

This is very similar to the above, except you need to get the numbers from `--stat` and add them together.

//code bash
git log
    --author="$(git config user.name)"
    --no-merges
    --before=$(date "+%Y-%m-01T00:00")
    --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59")
    --reverse
    --stat  # show the files changed, insertions, deletions line
    | grep -Eo "[0-9]{1,} files? changed"  # keep the "x file(s) changed" part of each commit
    | grep -Eo "[0-9]{1,}"  # keep the numbers
    | awk "{ sum += \$1 } END { print sum }"  # add them together

# one-line version
git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} files? changed" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }"

# add it to your git aliases
git config --global alias.flm '!echo $(git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} files? changed" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }") files changed last month'

# enjoy
git flm
17 files changed last month


# insertions and deletions are identical i.e.
git config --global alias.ilm '!echo $(git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} insertions?" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }") insertions last month'

git ilm
242 insertions last month


git config --global alias.dlm '!echo $(git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} deletions?" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }") deletions last month'

git dlm
9 deletions last month
//code


## Putting it all together ##

I am (apparently) notoriously lazy, so I really can't be bothered to type 3 different commands. So there:

//code bash
git config --global alias.slm '!echo $(git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse | grep commit | wc -l) commits, $(git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} files? changed" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }") files changed, $(git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} insertions?" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }") insertions and $(git log --author="$(git config user.name)" --no-merges --before=$(date "+%Y-%m-01T00:00") --after=$(date -d "-$(date +%d) days -1 month" "+%Y-%m-%dT23:59") --reverse --stat | grep -Eo "[0-9]{1,} deletions?" | grep -Eo "[0-9]{1,}" | awk "{ sum += \$1 } END { print sum }") deletions last month'

git slm
11 commits, 17 files changed, 242 insertions and 9 deletions last month
//code

I could extract the dates and make the whole thing prettier, and git probably hates my guts now that I did this to it, but hey, it works!


## Bonus points: past months ##

As I said, this only gives you information about the past month. But what if you what to know what happened 2 months ago? Or even 10?

Turns out, there's this little package called faketime that does exactly what it says it does.

//code bash
# Ho-ho-ho, let's see how coding went in December
faketime "2016-01-15" bash -l  # start a new bash session set to the 15th of January 2016
git slm
11 commits, 17 files changed, 242 insertions and 9 deletions last month
//code
