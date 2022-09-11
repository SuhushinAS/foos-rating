import {importScripts, requireAll} from 'entry';
import {attachEvent} from 'utils/event';

/**
 * По ошибке регистрации.
 * @param error Ошибка.
 */
const onRegisterError = (error) => {
  console.error('SW registration failed: ', error);
};

/**
 * По загрузке window.
 */
const onWindowLoad = () => {
  if ('serviceWorker' in navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').catch(onRegisterError);
  }
};

attachEvent(document, 'DOMContentLoaded', importScripts);
attachEvent(window, 'load', onWindowLoad);

if (module.hot && 'development' === process.env.NODE_ENV) {
  requireAll(require.context('./pages/', true, /template\.js$/u));

  module.hot.accept('entry', importScripts);
}
