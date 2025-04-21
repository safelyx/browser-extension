import { Browser, OnClickData } from './types.ts';

declare namespace globalThis {
  const chrome: Browser;
  const browser: Browser;
}

if (typeof globalThis.browser === 'undefined') {
  // @ts-expect-error this is a hack to make the same code work in both Chrome and Firefox
  globalThis.browser = globalThis.chrome;
}

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
    contexts: ['image', 'link'],
  });
});

browser.contextMenus.onClicked.addListener(checkLinkInSafelyx);
