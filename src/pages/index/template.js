import data from './data.json';
import navigation from 'modules/layout/navigation/data.json';
import template from './index.hbs';

export default template({
  ...data,
  navigation,
});
