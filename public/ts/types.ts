/** Reference: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs */
export interface Browser {
  contextMenus: {
    create: (options: {
      id: string;
      title: string;
      contexts: ContextType[];
      targetUrlPatterns?: string[];
    }) => void;
    removeAll: (callback: () => void) => void;
    onClicked: {
      addListener: (listener: (info: OnClickData) => void) => void;
    };
  };
  tabs: {
    create: (options: {
      url: string;
    }) => void;
  };
  runtime: {
    openOptionsPage: () => void;
  };
  storage: {
    sync: {
      set: (data: { keyCode: string }) => Promise<void>;
      get: (key: 'keyCode') => Promise<{ keyCode: string }>;
    };
  };
}

/** Reference: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType && https://developer.chrome.com/docs/extensions/reference/api/contextMenus */
type ContextType =
  | 'all'
  | 'action'
  | 'audio'
  // | 'bookmark' // Firefox only
  | 'browser_action'
  | 'editable'
  | 'frame'
  | 'image'
  | 'link'
  | 'page'
  | 'page_action'
  | 'password'
  | 'selection'
  // | 'tab' // Firefox only
  | 'tools_menu'
  | 'video';

export interface OnClickData {
  menuItemId: string;
  linkUrl?: string;
  pageUrl?: string;
  srcUrl?: string;
}
