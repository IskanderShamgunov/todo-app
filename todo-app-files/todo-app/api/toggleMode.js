function toggleMode(mode) {
  mode = (mode === 'local') ? 'server' : 'local';
  localStorage.setItem('storageMode', mode);
  location.reload();
}

export { toggleMode };
