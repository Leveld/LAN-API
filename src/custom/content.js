const fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */

const sections = {
  Introduction: fs.readFileSync('./content/introduction.md', 'utf8'),
  Routes: fs.readFileSync('./content/routes/outlet.md', 'utf8') +
          fs.readFileSync('./content/routes/coInfo.md', 'utf8') +
          fs.readFileSync('./content/routes/coURL.md', 'utf8')  +
          fs.readFileSync('./content/routes/user.md', 'utf8'),
  Models: fs.readFileSync('./content/models/user.md', 'utf8')                +
          fs.readFileSync('./content/models/contentProducer.md', 'utf8')     +
          fs.readFileSync('./content/models/contentOutlet.md', 'utf8')       +
          fs.readFileSync('./content/models/manager.md', 'utf8')             +
          fs.readFileSync('./content/models/business.md', 'utf8')            +
          fs.readFileSync('./content/models/authToken.md', 'utf8')           +
          fs.readFileSync('./content/models/contentOutletToken.md', 'utf8')
};

module.exports = (
  () => {
    const entries = Object.entries(sections);
    let string = '';
    for (let [header, content] of entries)
      string += `# ${header}\n${content}\n`;
    return string;
  }
)();
