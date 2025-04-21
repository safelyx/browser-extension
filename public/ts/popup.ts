import { Browser } from './types.ts';

declare namespace globalThis {
  const chrome: Browser;
  const browser: Browser;
}

if (typeof globalThis.browser === 'undefined') {
  // @ts-expect-error this is a hack to make the same code work in both Chrome and Firefox
  globalThis.browser = globalThis.chrome;
}

declare const browser: Browser;

const linkOrEmailInput = document.getElementById('link_or_email') as HTMLInputElement;
const checkForm = document.getElementById('check-form') as HTMLFormElement;
const settingsLink = document.getElementById('settings-link') as HTMLAnchorElement;

document.addEventListener('DOMContentLoaded', () => {
  linkOrEmailInput?.focus();

  checkForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const linkOrEmail = linkOrEmailInput.value;

    browser.storage.sync.get('keyCode').then((result) => {
      const keyCode = result.keyCode || '';

      if (linkOrEmail.startsWith('http://') || linkOrEmail.startsWith('https://')) {
        browser.tabs.create({ url: `https://safelyx.com/safe-link-checker?link=${linkOrEmail}&key_code=${keyCode}` });
      } else {
        browser.tabs.create({ url: `https://safelyx.com/safe-email-checker?email=${linkOrEmail}&key_code=${keyCode}` });
      }

      window.close();
    });
  });

  settingsLink?.addEventListener('click', (event) => {
    event.preventDefault();

    browser.runtime.openOptionsPage();

    window.close();
  });
});
