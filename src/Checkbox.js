import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked
    };
  }

  handleChange(e) {
    const { checked } = e.target;
    console.log('Checkbox - handleChange -> checked: ', checked);

    this.setState({ checked });
    this.props.onChange(checked);
  }

  render() {
    return (<input type="checkbox" checked={this.state.checked} onChange={this.handleChange.bind(this)} />);
  }
}

export default Checkbox;
