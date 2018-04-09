chrome.devtools.panels.create('panel', 'img/logo.png', 'pages/panel.html', _panel_ => {
  console.log('hello from callback');
});