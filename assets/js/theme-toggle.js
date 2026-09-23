(() => {
  const root = document.documentElement;
  const button = document.getElementById('mode-toggle');
  if (!button) return;

  const compactLayout = window.matchMedia('(max-width: 849px)');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const updateLabel = () => {
    button.setAttribute(
      'aria-label',
      root.dataset.bsTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
    );
  };

  const followSystemOnCompact = () => {
    if (!compactLayout.matches) return;

    localStorage.removeItem('theme');
    root.removeAttribute('data-theme-persisted');
    const systemTheme = systemDark.matches ? 'dark' : 'light';
    if (root.dataset.bsTheme !== systemTheme) {
      root.dataset.bsTheme = systemTheme;
      window.postMessage({ id: 'theme-updated' }, '*');
    }
    updateLabel();
  };

  button.addEventListener('click', () => {
    const nextTheme = root.dataset.bsTheme === 'dark' ? 'light' : 'dark';
    root.dataset.bsTheme = nextTheme;
    root.setAttribute('data-theme-persisted', '');
    localStorage.setItem('theme', nextTheme);
    window.postMessage({ id: 'theme-updated' }, '*');
    updateLabel();
  });

  compactLayout.addEventListener('change', followSystemOnCompact);
  systemDark.addEventListener('change', followSystemOnCompact);
  followSystemOnCompact();
  updateLabel();
})();
