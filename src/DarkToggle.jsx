import React, { Component } from 'react';

class DarkToggle extends Component {
    state = {
        mode: document.getElementsByTagName("Body")[0].classList[0]
    }
    render() {
        const toggle = () => {
            // const mode = document.getElementsByTagName("Body")[0].classList[0];
            this.state.mode === "dark" ? localStorage.setItem("mode", "light") : localStorage.setItem("mode", "dark");
            document.getElementsByTagName("Body")[0].classList.replace(this.state.mode, localStorage.getItem("mode"));
            this.setState({
                mode: localStorage.getItem("mode")
            })
        }
        return (
            <div className="input-group custom-control custom-switch">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={toggle}
                    checked = {this.state.mode === "dark"}
                    id="dark"
                />
                <label className="m-2 mb-0 custom-control-label" style={{ fontSize: "18px" }} htmlFor="dark">
                    Dark Mode
          </label>
            </div>
        );
    }
}

export default DarkToggle;
