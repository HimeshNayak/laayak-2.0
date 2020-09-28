import React, { Component } from "react";
import firebase from "../firebase";
class AddPoll extends Component {
  state = {
    show: false,
    yesOption: "",
    noOption: "",
    text: "",
    isOfficial: false
  };

  // toggle show state
  showModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  // modal show/hide class
  showHideClassName = () => (this.state.show ? "" : "d-none");

  styles = {
    position: "fixed",
    background: "pink",
    color: "black",
    width: "60%",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 1,
    boxShadow: "2px 2px 10px 10px rgba(255, 31, 255, 0.226)",
  };

  render() {
    return (
      <div>
        <button className="btn-lg btn-info m-1" onClick={this.showModal}>
          Add Poll
        </button>
        <div className={this.showHideClassName()}>
          <section className="" style={this.styles}>
            <h3 className="mt-2">Add Poll Details:</h3>
            <form onSubmit={this.callAddPoll}>{this.getForm()}</form>
            <button className="btn-info btn mb-2" onClick={this.hideModal}>
              Close
            </button>
          </section>
        </div>
      </div>
    );
  }

  getForm = () => {
    return (
      <div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Poll Text:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Poll Details"
              name="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">First Option:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="First option"
              name="yesOption"
              value={this.state.yesOption}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Second Option:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="Second option"
              name="noOption"
              value={this.state.noOption}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group custom-control custom-switch">
          <input 
          type="checkbox" 
          className="custom-control-input" 
          id="pollIsOfficial"
          name="isOfficial"
          onChange={(e) => this.setState({isOfficial: e.target.checked})}
          name="text" 
          />
          <label className="m-2 mb-0 custom-control-label" htmlFor="pollIsOfficial">
            Official
          </label>
        </div>
        <button className="btn btn-success m-2" onClick={this.hideModal}>
          Add poll
        </button>
      </div>
    );
  };

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  callAddPoll = (e) => {
    e.preventDefault(); // preventing reload
    const newPoll = {
      dateAndTime: firebase.firestore.Timestamp.fromDate(new Date()),
      type: "poll",
      text: this.state.text,
      yesOption: this.state.yesOption,
      noOption: this.state.noOption,
      yesCount: 0,
      noCount: 0,
      isOfficial: this.state.isOfficial
    };
    console.log(newPoll);
    this.props.addPoll(newPoll);
    this.setState({
      text: "",
      yesOption: "",
      noOption: "",
      isOfficial: false
    });
  };
}

export default AddPoll;
