import {importScripts, requireAll} from 'entry';
import {attachEvent} from 'utils/event';

attachEvent(document, 'DOMContentLoaded', importScripts);

if (module.hot && 'development' === process.env.NODE_ENV) {
  requireAll(require.context('./pages/', true, /template\.js$/u));

  module.hot.accept('entry', () => {
    document.dispatchEvent(new CustomEvent('destroy'));
    importScripts();
  });
}
