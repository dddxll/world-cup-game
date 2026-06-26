// 懂球帝球员头像提取脚本
// 使用方法:
// 1. 打开懂球帝球队页面, 如: https://www.dongqiudi.com/team/50000499.html (巴西)
// 2. 按 F12 打开开发者工具 → Console 控制台
// 3. 复制粘贴此脚本, 按回车运行
// 4. 复制输出的 JSON, 发给我

(async function extractAvatars() {
  const players = [];

  // 方法1: 查找页面上所有球员相关的图片
  const imgs = document.querySelectorAll('img[src*="qunliao.info"], img[data-src*="qunliao.info"]');

  imgs.forEach(img => {
    const src = img.src || img.getAttribute('data-src');
    if (src && src.includes('qunliao.info')) {
      // 尝试从附近元素找球员名字
      const parent = img.closest('a, li, div');
      const nameEl = parent ? parent.querySelector('span, p, h3, h4, .name, .player-name') : null;
      const name = nameEl ? nameEl.textContent.trim() : 'unknown';

      players.push({
        name: name,
        avatar: src,
        // 尝试从alt属性获取名字
        alt: img.alt || ''
      });
    }
  });

  // 方法2: 查找JSON数据 (懂球帝通常把数据存在window.__INITIAL_STATE__)
  if (window.__INITIAL_STATE__) {
    console.log('找到页面数据:', Object.keys(window.__INITIAL_STATE__));
  }

  // 方法3: 查找所有链接中的球员数据
  const links = document.querySelectorAll('a[href*="player"]');
  links.forEach(link => {
    const img = link.querySelector('img[src*="qunliao.info"]');
    const name = link.querySelector('.name, span, p')?.textContent?.trim();
    if (img && name) {
      players.push({ name, avatar: img.src });
    }
  });

  console.log(`找到 ${players.length} 个球员头像`);
  console.log(JSON.stringify(players, null, 2));

  // 自动复制到剪贴板
  const json = JSON.stringify(players, null, 2);
  try {
    await navigator.clipboard.writeText(json);
    console.log('✅ 已复制到剪贴板! 直接粘贴给我');
  } catch(e) {
    console.log('⚠️ 请手动复制上方 JSON');
  }

  return players;
})();
