import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti'

class Navbar extends React.Component {
    state = {
        open: false,
    }
    render() {
        return (
            <nav>
                <div className="navbar__outer">
                    <div className="container">
                        <div className="navbar">
                            <div className="navbar__logo">
                                <Link to="/"><img src="/images/logo.png" /></Link>
                            </div>
                            <div className="navbar__links">

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar