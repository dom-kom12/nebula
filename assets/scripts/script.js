function changeTheme(theme) {
  const themeLink = document.getElementById('theme-style');
  
  switch (theme) {
    case 'light':
      themeLink.href = 'styles/light.css';
      break;
    case 'dark':
      themeLink.href = 'styles/dark.css';
      break;
    case 'neon':
      themeLink.href = 'styles/neon.css';
      break;
    default:
      themeLink.href = 'styles/light.css';
      break;
  }
}
