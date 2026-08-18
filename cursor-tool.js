(() => {
  const images = [
    'hand-slap.png',
    'insecticide-spray.png',
    'electric-swatter.png',
  ];

  function syncToolCursor() {
    const cursor = document.querySelector('.weapon-cursor');
    if (!cursor || typeof l === 'undefined') return;
    cursor.style.setProperty('background-image', `url("./${images[l]}")`, 'important');
  }

  // The level is changed just before intro() is called, so synchronise in the
  // same call stack instead of waiting for a mouse movement or timer tick.
  const originalIntro = window.intro;
  window.intro = function syncedIntro(...args) {
    syncToolCursor();
    return originalIntro.apply(this, args);
  };

  const originalStart = window.start;
  window.start = function syncedStart(...args) {
    syncToolCursor();
    return originalStart.apply(this, args);
  };

  syncToolCursor();
  setInterval(syncToolCursor, 25);
})();
