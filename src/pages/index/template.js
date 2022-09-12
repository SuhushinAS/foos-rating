import viewType from 'modules/layout/navigation/viewType.json';
import data from './data.json';
import template from './index.hbs';

export default template({
  ...data,
  viewType,
});
