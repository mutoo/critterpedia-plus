const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');
const css = require('css');
const schema = require('./options.json');

/**
 * This loader parses the key/value pairs from the font style.css into an array
 */
module.exports = function loader(source) {
  const options = getOptions(this) || {};
  validateOptions(schema, options, 'Racing Icon Loader');
  let charsets = [];

  try {
    const { prefix } = options;
    const regKey = new RegExp(`\\.${prefix}([a-zA-Z0-9-]+)::?before`);
    const regValue = new RegExp(/"(\\\w+)"/);
    const ast = css.parse(source);
    charsets = ast.stylesheet.rules
      .filter(r => r.type === 'rule' && r.selectors[0].startsWith(`.${prefix}`))
      .map(r => {
        const selector = r.selectors[0];
        const key = selector.match(regKey)[1];
        const content = r.declarations.find(d => d.property === 'content');
        const value = content.value.match(regValue)[1];
        return { key, value };
      });
  } catch (error) {
    this.emitError(error);
  }

  return `module.exports = ${JSON.stringify(charsets)};`;
};
