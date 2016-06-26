/* ========================================================================
 * Nighttime... daytime!
 * ======================================================================== */

function nightMode() {
  var link = document.createElement('link');
  link.id = 'night-mode';
  link.rel = 'stylesheet';
  link.href = '/assets/night-mode.css';
  document.head.appendChild(link);
  document.querySelector('meta[name=theme-color]').setAttribute('content', '#00425a');
  document.querySelector('link[rel=icon]').href = '/assets/icon-night.png';
}

function dayMode() {
  var link = document.getElementById('night-mode');
  link.parentNode.removeChild(link);
  document.querySelector('meta[name=theme-color]').setAttribute('content', '#95c55f');
  document.querySelector('link[rel=icon]').href = '/assets/icon.png';
}

var date = new Date();
if (date.getHours() >= 21 || date.getHours() <= 6) {
  nightMode();
}

document.getElementById('site-header').onclick = function(event) {
  if (event.target.id != 'site-header') {
    return;
  }
  if (document.getElementById('night-mode') == null) {
    nightMode();
  } else {
    dayMode();
  }
}

/* ========================================================================
 * Unmangle email
 * ======================================================================== */

var email = document.getElementById('email');
if (email != null) {
  email.href = email.href.substr(0, 11) + email.href.substr(27);
}

/* ========================================================================
 * Console conspiracy
 * ======================================================================== */

console.error('GET http://a.life.com/');
console.log('');
console.log("Just kidding. I love snooping into people's websites as well :)");
console.log("Here's a cat for your effort: http://youtu.be/A67OAOyJ9Dk");
console.log('');
console.log('Have a good one!');

/* ========================================================================
 * Section
 * ======================================================================== */



/* ========================================================================
 * Section
 * ======================================================================== */



/* ========================================================================
 * Section
 * ======================================================================== */



/* ========================================================================
 * Section
 * ======================================================================== */
