import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "../firebase";
import "./forbidden.css"

class Forbidden extends Component {
    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                window.location.pathname.concat("/login");
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    render() {
        return (
            <div className="403">
                <section className="page_403">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="col-sm-offset-1  text-center">
                                    <h1 className="text-center">403</h1>
                                    <div className="four_zero_three_bg">
                                    </div>
                                    <div className="contant_box_403">
                                        <h3 className="h2">
                                            Access Denied
		                                </h3>
                                        <h5>
                                            <button className="btn btn-primary mx-2" onClick={this.handleSignOut}>Sign In</button>
                                            to gain access / go
                                            <Link className="btn btn-success mx-2" to="/">Home</Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Forbidden;
