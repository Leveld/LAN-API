import React from 'react';
import PropTypes from 'prop-types';
import Section from './section';
import GithubSlugger from 'github-slugger';
import { transformURL } from '../custom';
import variables from './variables';
let slugger = new GithubSlugger();
let slug = title => { slugger.reset(); return slugger.slug(title); };

var roundedToggleOptionType = PropTypes.shape({
  title: PropTypes.string,
  value: PropTypes.string
});

function chunkifyAST(ast, language) {
  var preview = false;
  return ast.children.reduce((chunks, node) => {
    if (node.type === 'heading' && node.depth === 1) {
      return chunks;
    } else if (node.type === 'heading' && node.depth < 4) {
      chunks.push([node]);
    } else {
      chunks[chunks.length - 1].push(node);
    }
    return chunks;
  }, [[]]).filter(chunk => chunk.length)
  .map(chunk => {
    var left = [], right = [], title, id;
    if (language === 'cli') {
      language = 'bash';
    }
    if (chunk[0].depth < 3) {
      preview = false;
    }
    chunk.forEach(node => {
      const readLangOptions = (node) => {
        if (node.lang) {
          node.lang = node.lang.toLowerCase();
          if (node.lang.includes('-left')) {
            node.lang = node.lang.replace('-left', '');
            node.moveLeft = true;
          } else {
            node.moveLeft = node.moveLeft === true;
          }
          if (node.lang.includes('-switch')) {
            node.lang = node.lang.replace('-switch', '');
            node.switch = true;
          } else {
            node.switch = node.switch === true;
          }
        }
      };
      const injectVariables = (node) => {
        node.value = variables.replaceVariables(node.value);
      };
      const pushNode = (node) => {
        if (node.moveLeft === true)
          left.push(node);
        else
          right.push(node);
      };
      readLangOptions(node);
      injectVariables(node);
      if (node.type === 'code') {
        if (node.lang === 'json' || node.lang === 'http' || node.lang === 'html') {
          pushNode(node);
        } else if (node.lang === language || (node.moveLeft === true && node.switch === false)) {
          if (node.lang === 'curl') {
            pushNode({ ...node, lang: 'bash' });
          } else {
            pushNode(node);
          }
        } else if (node.lang === 'endpoint') {
          pushNode((transformURL(node.value)));
        } else if (node.lang === null) {
          left.push(node);
        }
      } else if (node.type === 'heading' && node.depth >= 4) {
        right.push(node);
      } else if (node.type === 'blockquote') {
        right.push(node);
      } else if (node.type === 'heading' && node.depth < 4 && !title) {
        title = node.children[0].value;
        id = node.data ? node.data.id || '' : '';
        left.push(node);
      } else if (node.type === 'html' && node.value.match(/^<!--\s*preview\s*-->$/)) {
        preview = true;
      } else {
        left.push(node);
      }
    });
    return { left, right, title, id, preview, slug: slug(title) };
  });
}

export default class Content extends React.PureComponent {
  static propTypes = {
    ast: PropTypes.object.isRequired,
    language: roundedToggleOptionType,
    leftClassname: PropTypes.string.isRequired,
    rightClassname: PropTypes.string.isRequired
  }
  render() {
    let { ast, language, leftClassname, rightClassname } = this.props;
    return (<div className='clearfix'>
      {chunkifyAST(ast, language.value).map((chunk, i) => (<Section
        leftClassname={leftClassname}
        rightClassname={rightClassname}
        chunk={chunk}
        // bob={console.log(ast) || console.log(language) || console.log(chunk) || console.log('')}
        key={i} />))}
    </div>);
  }
}
