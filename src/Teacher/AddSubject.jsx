import React, { Component } from "react";

class AddSubject extends Component {
    state = {
        show: false,
        course: "",
        subject: "",
        code: "",
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
        display: "block",
        background: "pink",
        color: "black",
        width: "60%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 1,
        boxShadow: "2px 2px 10px 10px rgba(255, 31, 255, 0.226)",
    };

    render() {
        return (
            <div>
                <button className="btn btn-info btn-lg mb-4" onClick={this.showModal}>
                    New Subject +
                </button>

                <div className={this.showHideClassName()}>
                    <section className="" style={this.styles}>
                        <h3 className="mt-2">Add Subject Details:</h3>
                        <form onSubmit={this.callAddSubject}>{this.getForm()}</form>
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
            <div className="">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Course:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="course"
                            name="course"
                            value={this.state.course}
                            required
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Subject Name:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            value={this.state.subject}
                            required
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Subject Code:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            name="code"
                            value={this.state.code}
                            required
                            onChange={this.handleChange}
                        />
                    </div>
                </div>                
                <button className="btn btn-success m-2">Add</button>
            </div>
        );
    };

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    };

    callAddSubject = (e) => {
        e.preventDefault(); // preventing reload
        const subj = {
            subjectName: this.state.subject,
            subjectCode: this.state.code,
            course: this.state.course,
        };
        this.setState({ show: false });
        this.props.addSubject(subj);
        this.setState({
            course: "",
            subject: "",
            code: "",
        });
    };
}

export default AddSubject;
