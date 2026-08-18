(() => {
  const byId = (id) => document.getElementById(id);
  let hasScoredThisRound = false;

  // A round begins at 0, so only treat zero as a loss after the player has
  // earned points and subsequently been knocked back down.
  setInterval(() => {
    if (!run) {
      hasScoredThisRound = false;
      return;
    }
    if (s > 0) hasScoredThisRound = true;
    if (hasScoredThisRound && s <= 0) {
      hasScoredThisRound = false;
      window.end(false, '分数归零！');
    }
  }, 50);

  window.end = function endScreen(ok, msg) {
    run = false;
    clearInterval(sp);
    clearInterval(ti);
    clearTimeout(bz);
    F.innerHTML = '';
    M.classList.remove('hide');

    if (ok && l < 2) {
      C.innerHTML = `<div class="end-art hero"></div><h1>🏆 第 ${l + 1} 关通关！</h1><p>${msg}<br>解锁：${l === 0 ? '💨 杀虫剂' : '⚡ 电蚊拍'}</p><button class="play" id="go">进入下一关</button>`;
      byId('go').onclick = () => { l += 1; intro(); };
    } else if (ok) {
      C.innerHTML = '<div class="end-art hero"></div><h1>👑 三关全通！</h1><p>你完成了 99 拍蚊挑战，成为真正的灭蚊侠！</p><button class="play" id="go">从第一关再来</button>';
      byId('go').onclick = () => { l = 0; intro(); };
    } else {
      C.innerHTML = `<div class="end-art bites"></div><h1>😵 本关失败</h1><p>${msg}<br>被蚊子叮得满身包了，再试一次！</p><button class="play" id="go">重试本关</button>`;
      byId('go').onclick = start;
    }
  };
})();
