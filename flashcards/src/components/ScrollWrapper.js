import { Component } from 'react';

class ScrollWrapper extends Component {
   
  componentDidUpdate() {
    window.scrollTo(0, 0);
  };

  render() {
    return this.props.children;
  };
};

export default ScrollWrapper;
