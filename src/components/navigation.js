import React from 'react';
import PropTypes from 'prop-types';
import NavigationItem from './navigation_item';
import { footerContent } from '../custom';

function getAllInSectionFromChild(headings, idx) {
  for (var i = idx; i > 0; i--) {
    if (headings[i].depth === 2) {
      return getAllInSection(headings, i);
    }
  }
}

function getAllInSection(headings, idx) {
  var activeHeadings = [];
  for (var i = idx + 1; i < headings.length; i++) {
    if (headings[i].depth === 3) {
      activeHeadings.push(headings[i]);
    } else if (headings[i].depth === 2) {
      break;
    }
  }
  return activeHeadings;
}

export default class Navigation extends React.PureComponent {
  static propTypes = {
    ast: PropTypes.object.isRequired,
    activeSection: PropTypes.string,
    navigationItemClicked: PropTypes.func.isRequired
  }
  render() {
    var activeHeadings = [];
    let headings = this.props.ast.children
      .filter(child => child.type === 'heading' && child.depth < 4);

    if (this.props.activeSection) {
      let activeHeadingIdx = headings.findIndex(heading =>
        JSON.stringify(heading) === JSON.stringify(this.props.activeItem));
      let activeHeading = headings[activeHeadingIdx] || null;

      if (activeHeading !== null) {
        if (activeHeading.depth === 3)
          activeHeadings = getAllInSectionFromChild(headings, activeHeadingIdx);

        if (activeHeading.depth === 2)
          activeHeadings = getAllInSection(headings, activeHeadingIdx);
      }
    }

    return (<div className='pad0x small'>
      {headings
        .map((child, i) => {
          let sectionName = child.children[0].value;
          var active = (typeof this.props.activeItem === 'object' && this.props.activeItem !== null) ? JSON.stringify(child) === JSON.stringify(this.props.activeItem) : false;
          if (child.depth === 1) {
            return (<div key={i}
              className='small pad0x quiet space-top1'>{sectionName}</div>);
          } else if (child.depth === 2) {
            return (<NavigationItem
              key={i}
              href={`#${child.data.id}`}
              onClick={this.props.navigationItemClicked}
              active={active}
              sectionName={sectionName} />);
          } else if (child.depth === 3) {
            if (activeHeadings.findIndex((activeChild) => JSON.stringify(child) === JSON.stringify(activeChild)) >= 0) {
              return (<div
                key={i}
                className='space-left1'>
                  <NavigationItem
                    href={`#${child.data.id}`}
                    onClick={this.props.navigationItemClicked}
                    active={active}
                    sectionName={sectionName} />
                </div>);
            }
          }
        })}
        {footerContent}
    </div>);
  }
}
