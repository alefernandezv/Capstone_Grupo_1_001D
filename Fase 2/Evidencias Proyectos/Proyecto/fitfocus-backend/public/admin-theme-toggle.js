window.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.innerText = '🌙 / ☀️';
  btn.style.position = 'fixed';
  btn.style.top = '10px';
  btn.style.right = '10px';  // esquina superior derecha
  btn.style.zIndex = 9999;
  btn.style.padding = '5px 10px';
  btn.style.borderRadius = '5px';
  btn.style.border = 'none';
  btn.style.cursor = 'pointer';
  btn.style.backgroundColor = '#007bff';
  btn.style.color = '#fff';
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    const html = document.documentElement;
    if(html.getAttribute('data-theme') === 'dark') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
    }
  });
});
