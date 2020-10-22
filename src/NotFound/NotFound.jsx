import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./NotFound.css"

class NotFound extends Component {
    render() {
        return (
            <div className="main">
                <section className="page_404">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="col-sm-offset-1  text-center">
                                    <div className="four_zero_four_bg">
                                        <h1 className="text-center">404</h1>
                                    </div>
                                    <div className="contant_box_404">
                                        <h3 className="h2">
                                            Look like you're lost
		                                </h3>
                                        <p>the page you are looking for not avaible!</p>
                                        <Link to="/">
                                            <i className="fa fa-home home"></i>
                                        </Link>
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

export default NotFound;
