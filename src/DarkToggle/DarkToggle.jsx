import React, { Component } from 'react';
import "./DarkToggle.css"

class DarkToggle extends Component {
    state = {
        mode: document.getElementsByTagName("Body")[0].classList[0]
    }
    render() {
        const toggle = () => {
            this.state.mode === "dark" ? localStorage.setItem("mode", "light") : localStorage.setItem("mode", "dark");
            document.getElementsByTagName("Body")[0].classList.replace(this.state.mode, localStorage.getItem("mode"));
            this.setState({
                mode: localStorage.getItem("mode")
            })
        }
        return (
            <div className="float-md-left w-auto mb-2 input-group custom-control custom-switch">
                <label id="switch" className="switch">
                    <input 
                    type="checkbox" 
                    className="custom-control-input"
                    onChange={toggle}
                    checked={this.state.mode === "dark"}
                    id="dark" />
                    <span className="slider round"></span>
                </label>                
            </div>
        );
    }
}

export default DarkToggle;
