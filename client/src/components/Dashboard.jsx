import React, { Component } from "react";

export default class Dashboard extends Component {
  state = {
    count: 1,
    name: "diyin",
    class: "cs484",
    imageUrl: "https://picsum.photos/200",
    list: ["item1", "item2", "item3"],
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  setValue = (val) => {
    this.setState({ count: val });
  };

  render() {
    return (
      <div className="container">
        <h1>Welcome to the dashboard {this.state.name}</h1>
        <img src={this.state.imageUrl} alt="" />
        {this.renderList()}
        {this.renderTable()}
      </div>
    );
  }

  renderTable = () => {
    return (
      <React.Fragment>
        <h1>Using states and updating state</h1>
        <table className="table table-dark" style={{ maxWidth: 1000 }}>
          <tbody>
            <tr className="table-dark">
              <th>Action</th>
              <th>Effect</th>
            </tr>
            <tr className="table-dark">
              <td className="table-dark">
                <button
                  className="btn btn-danger"
                  onClick={this.handleIncrement}
                >
                  increment
                </button>
              </td>
              <td className="table-dark">
                <p>{this.state.count}</p>
              </td>
            </tr>
            <tr className="table-dark">
              <td className="table-dark">
                <input
                  placeholder="Enter a number"
                  className="form-control"
                  style={{ maxWidth: 300 }}
                  onChange={(event) => this.setValue(event.target.value)}
                />
              </td>
              <td className="table-dark">
                <p>{this.state.count}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  };

  renderList() {
    return (
      <React.Fragment>
        <h2>Here's a list</h2>
        <ul>
          {this.state.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
