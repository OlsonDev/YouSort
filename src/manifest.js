module.exports = {
  name: 'YouSort',
  version: '0.0.1',
  description: 'Sort YouTube playlists with custom rules.',
  homepage_url: 'https://github.com/OlsonDev/YouSort',
  author: 'OlsonDev',
  manifest_version: 2,
  icons: { 16: 'icons/16.png', 128: 'icons/128.png' },
  permissions: [
    'http://youtube.com/*',
    'activeTab',
    'tabs',
    'cookies',
    'background',
    'contextMenus',
    'unlimitedStorage',
    'storage',
    'notifications',
    'identity',
    'identity.email',
  ],
  browser_action: {
    default_title: 'YouSort',
    default_popup: 'pages/popup.html',
  },
  background: {
    persistent: false,
    page: 'pages/background.html',
  },
  options_page: 'pages/options.html',
  content_scripts: [{
    js: ['js/content.js'],
    run_at: 'document_end',
    matches: ['https://www.youtube.com/*'],
    all_frames: true,
  }],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: ['panel.html', 'js/content.js'],
};