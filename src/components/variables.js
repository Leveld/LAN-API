import variables from '../custom/variables';

const createRegex = (variable) => new RegExp(`(?<!\\\\)\\$${variable}\\$`, 'g');

module.exports = typeof variables === 'object' && variables !== null ? Object.entries(variables).reduce((cache, [key, value]) => {
  cache[`$${key}$`] = {
    regex: createRegex(key),
    replacement: value
  };
  return cache;
}, {}) : {};

Object.defineProperty(module.exports, 'replaceVariable', {
  value: (string, variable) => {
    if (typeof string !== 'string' || typeof variable !== 'string')
      return string;
    if (!module.exports[variable])
      return string;
    const { regex, replacement } = module.exports[variable];
    if (regex.test(string))
      return string.replace(regex, replacement);
    return string;
  },
  enumerable: false,
  configurable: false
});

Object.defineProperty(module.exports, 'replaceVariables', {
  value: (string) => {
    if (typeof string !== 'string')
      return string;
    let replaced = string;
    for (let key of Object.keys(module.exports)) {
        replaced = module.exports.replaceVariable(replaced, key);
    }
    return replaced;
  },
  enumerable: false,
  configurable: false
});
