import React, { Component } from 'react';
import Select from 'react-select';


export default class OnSelectResetsInput extends React.Component {

  state = {
    selectedOptions: [],
  }

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
  }

  render() {
    const { selectedOptions } = this.state;

    return (
      <React.Fragment>
        <Select
          value={selectedOptions}
          onChange={this.handleChange}
          options={options}
        />
        {selectedOptions.value}
      </React.Fragment>
    );
  }
}
