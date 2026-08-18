(() => {
  const style = document.createElement('style');
  style.textContent = `
    .weapon-cursor { display: none !important; }
    .fixed-weapon-cursor { position: fixed; z-index: 9999; width: 96px; height: 96px;
      pointer-events: none; display: none; transform: translate(-22px, -22px);
      background: center / contain no-repeat; filter: drop-shadow(4px 6px 3px #16090088); }
    .fixed-weapon-cursor.visible { display: block; }
  `;
  document.head.append(style);

  const cursor = document.createElement('i');
  cursor.className = 'fixed-weapon-cursor';
  document.body.append(cursor);

  const imageForLevel = () => {
    const label = document.getElementById('stage')?.textContent || '';
    if (label.includes('第 3')) return 'electric-swatter.png';
    if (label.includes('第 2')) return 'insecticide-spray.png';
    return 'hand-slap.png';
  };

  const update = () => {
    cursor.style.backgroundImage = `url("./${imageForLevel()}")`;
  };

  const field = document.getElementById('field');
  field.addEventListener('pointerenter', () => { update(); cursor.classList.add('visible'); });
  field.addEventListener('pointerleave', () => cursor.classList.remove('visible'));
  field.addEventListener('pointermove', (event) => {
    update();
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  setInterval(update, 30);
})();
