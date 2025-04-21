import { Browser, OnClickData } from './types.ts';

declare const browser: Browser;

const MENU_ITEM_ID = 'check-in-safelyx';

function checkLinkInSafelyx(info: OnClickData) {
  if (info.menuItemId !== MENU_ITEM_ID) {
    return;
  }

  const link = info.linkUrl || info.srcUrl || info.pageUrl;

  if (!link) {
    return;
  }

  browser.storage.sync.get('keyCode').then((result) => {
    const keyCode = result.keyCode || '';

    if (link.startsWith('mailto:')) {
      browser.tabs.create({
        url: `https://safelyx.com/safe-email-checker?email=${link.replace('mailto:', '')}&key_code=${keyCode}`,
      });
    } else {
      browser.tabs.create({ url: `https://safelyx.com/safe-link-checker?link=${link}&key_code=${keyCode}` });
    }
  });
}

// Ensure the context menu is removed and recreated on every load
browser.contextMenus.removeAll(function () {
  browser.contextMenus.create({
    id: MENU_ITEM_ID,
    title: 'Check in Safelyx',
    contexts: ['bookmark', 'image', 'link', 'tab'],
    icons: {
      '16': 'images/favicon.png',
      '32': 'images/favicon.png',
      '48': 'images/favicon.png',
      '128': 'images/favicon.png',
    },
  });
});

browser.contextMenus.onClicked.addListener(checkLinkInSafelyx);
