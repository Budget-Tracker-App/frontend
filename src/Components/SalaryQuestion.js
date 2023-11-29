import React, { Component } from 'react';

class SalaryQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: ''
    };
  }

  handleNext = () => {
    this.props.onNextStep({ salary: this.state.salary });
  };

  render() {
    const { salary } = this.state;

    return (
      <div>
        <h2>What is your total salary?</h2>
        <input
          type="number"
          value={salary}
          onChange={(e) => this.setState({ salary: e.target.value })}
          placeholder="Enter total salary"
        />
        <button onClick={this.handleNext}>Next</button>
      </div>
    );
  }
}

export default SalaryQuestion;
