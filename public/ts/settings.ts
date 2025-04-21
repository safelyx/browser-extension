import { Browser } from './types.ts';

declare const browser: Browser;

const keyCodeInput = document.getElementById('key_code') as HTMLInputElement;
const settingsForm = document.getElementById('settings-form') as HTMLFormElement;

document.addEventListener('DOMContentLoaded', () => {
  browser.storage.sync.get('keyCode').then((result) => {
    keyCodeInput.value = result.keyCode || '';
  });

  settingsForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const keyCode = keyCodeInput.value || '';

    browser.storage.sync.set({ keyCode }).then(() => {
      alert('Key code saved! You can now close this page.');
    });
  });
});
