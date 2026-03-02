(function () {
  const STORAGE = 'eng_debate_speeches';
  const FAV_KEY = 'eng_debate_profile';

  function getSpeeches() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE) || '[]');
    } catch {
      return [];
    }
  }

  function saveSpeeches(arr) {
    localStorage.setItem(STORAGE, JSON.stringify(arr));
  }

  function getProfile() {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function setProfile(p) {
    localStorage.setItem(FAV_KEY, JSON.stringify(p));
  }

  function toggleFavorite(speechId) {
    const profile = getProfile();
    profile.favoriteSpeeches = profile.favoriteSpeeches || [];
    const idx = profile.favoriteSpeeches.indexOf(speechId);
    if (idx >= 0) profile.favoriteSpeeches.splice(idx, 1);
    else profile.favoriteSpeeches.push(speechId);
    setProfile(profile);
  }

  function isFavorite(speechId) {
    return (getProfile().favoriteSpeeches || []).includes(speechId);
  }

  function render() {
    const q = (document.getElementById('speech-search')?.value || '').toLowerCase().trim();
    let list = getSpeeches();
    if (q) list = list.filter(s => (s.title + ' ' + (s.text || '')).toLowerCase().includes(q));

    const container = document.getElementById('speeches-list');
    if (!container) return;
    container.innerHTML = list.length
      ? list.map(s => `
        <div class="list-item">
          <div>
            <div class="card-title">${EngDebate.escapeHtml(s.title)}</div>
            <div class="meta">${s.source ? '来源: ' + s.source : ''} ${s.url ? '· URL' : ''}</div>
            ${(s.text || '').slice(0, 120)}${(s.text && s.text.length > 120) ? '…' : ''}
          </div>
          <button type="button" class="btn btn-ghost" data-id="${s.id}" data-fav="${isFavorite(s.id)}" title="收藏">${isFavorite(s.id) ? '★' : '☆'}</button>
        </div>
      `).join('')
      : '<div class="empty-state"><div class="icon">📜</div><p>暂无辩稿，可上传或粘贴 URL 添加</p></div>';

    container.querySelectorAll('[data-id]').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        toggleFavorite(id);
        render();
        if (window.EngDebate && window.EngDebate.renderProfile) window.EngDebate.renderProfile();
      });
    });
  }

  async function fetchTranscriptFromUrl(url) {
    if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) return null;
    return '[Demo] 粘贴 YouTube 等 URL 时，可接入 transcript API 或 oEmbed；此处为占位文本。请直接在下方文本框粘贴或上传辩稿内容。';
  }

  document.getElementById('speech-file')?.addEventListener('change', function (e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = function () {
      const ta = document.getElementById('speech-text');
      if (ta) ta.value = (r.result || '');
    };
    r.readAsText(file, 'UTF-8');
    e.target.value = '';
  });

  document.getElementById('speech-submit')?.addEventListener('click', async function () {
    const title = document.getElementById('speech-title')?.value?.trim();
    const url = document.getElementById('speech-url')?.value?.trim();
    let text = document.getElementById('speech-text')?.value?.trim() || '';

    if (!title) {
      alert('请填写标题');
      return;
    }
    if (url && !text) {
      text = await fetchTranscriptFromUrl(url) || '（请粘贴或上传辩稿内容）';
    }
    const speeches = getSpeeches();
    const id = 's' + Date.now();
    speeches.unshift({
      id,
      title,
      text,
      url: url || null,
      source: url ? 'URL' : '上传/粘贴',
      createdAt: new Date().toISOString(),
    });
    saveSpeeches(speeches);
    document.getElementById('speech-title').value = '';
    document.getElementById('speech-url').value = '';
    document.getElementById('speech-text').value = '';
    render();
  });

  document.getElementById('speech-search-btn')?.addEventListener('click', render);
  document.getElementById('speech-search')?.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') render();
  });

  window.addEventListener('page-show', function (e) {
    if (e.detail && e.detail.pageId === 'speeches') render();
  });
  window.addEventListener('hashchange', function () {
    if (document.getElementById('page-speeches')?.classList.contains('active')) render();
  });
})();
