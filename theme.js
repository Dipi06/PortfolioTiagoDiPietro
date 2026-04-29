// theme.js — alterna entre modo claro y oscuro y persiste la preferencia
(function(){
  const toggle = document.getElementById('theme-toggle');
  const storageKey = 'theme-preference';
  const root = document.documentElement;

  function applyTheme(theme){
    if(theme === 'dark'){
      root.setAttribute('data-theme','dark');
      if(toggle) toggle.textContent = '☀️';
    } else {
      root.removeAttribute('data-theme');
      if(toggle) toggle.textContent = '🌙';
    }
  }

  function getInitialTheme(){
    const saved = localStorage.getItem(storageKey);
    if(saved === 'dark' || saved === 'light') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  // Inicializar
  const current = getInitialTheme();
  applyTheme(current);

  if(toggle){
    toggle.addEventListener('click', function(){
      const isDark = root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try{ localStorage.setItem(storageKey, next); }catch(e){/* ignore */}
    });
  }
})();
