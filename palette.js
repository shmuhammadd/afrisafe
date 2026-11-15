// TEMPORARY colour chooser. Remove this file, its <script> tags and the "Colour chooser" CSS once a palette is picked.
// It only switches on when the page is opened with ?pick in the address, so ordinary visitors never see it.
(function () {
  var root = document.documentElement, KEY = 'afrisafe-palette', on = false, saved = 'current';
  try {
    if (new URLSearchParams(location.search).has('pick')) sessionStorage.setItem('afrisafe-pick', '1');
    on = sessionStorage.getItem('afrisafe-pick') === '1';
    saved = localStorage.getItem(KEY) || 'current';
  } catch (e) {}
  if (!on) return;
  var OPTIONS = [['current', 'Current'], ['a', 'A: refined mint'], ['b', 'B: amber and indigo']];
  function apply(name) {
    if (name === 'current') root.removeAttribute('data-palette'); else root.setAttribute('data-palette', name);
    try { localStorage.setItem(KEY, name); } catch (e) {}
    document.dispatchEvent(new Event('palettechange'));   // the hero animation redraws in the new colour
    var buttons = document.querySelectorAll('.picker button');
    for (var i = 0; i < buttons.length; i++) buttons[i].setAttribute('aria-pressed', buttons[i].value === name);
  }
  apply(saved);   // before first paint, so there is no flash of the wrong palette
  document.addEventListener('DOMContentLoaded', function () {
    var bar = document.createElement('div');
    bar.className = 'picker';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Choose a colour scheme');
    bar.innerHTML = '<span>Colour scheme</span>' + OPTIONS.map(function (o) {
      return '<button type="button" value="' + o[0] + '">' + o[1] + '</button>';
    }).join('');
    bar.addEventListener('click', function (e) { if (e.target.value) apply(e.target.value); });
    document.body.appendChild(bar);
    apply(root.getAttribute('data-palette') || 'current');
  });
})();
