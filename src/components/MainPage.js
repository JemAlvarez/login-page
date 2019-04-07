import React from 'react'
import { IoIosArrowDropright } from "react-icons/io";

class MainPage extends React.Component {
    state = {
        login: true
    }
    render() {
        return (
            <div className="container login">
                <div className="login__container">
                    <div className="header__wrapper">
                        <h1 className="header">{this.state.login === true ? 'Login' : 'Create Account'}</h1>
                    </div>
                    <p className="welcome">Welcome back! {this.state.login === true ? 'Login' : 'Create an account'} to access the app.</p>
                    <form className="form">
                        {
                            (this.state.login === true) ? (
                                <div className="form__login">
                                    <div className="form__group">
                                        <input type="text" name="email" required></input>
                                        <label htmlFor="email">Email <span>*</span></label>
                                    </div>
                                    <div className="form__group">
                                        <input type="password" name="password" required></input>
                                        <label htmlFor="password">Password <span>*</span></label>
                                    </div>
                                </div>
                            ) : (
                                    <div className="form__create">
                                        <div className="form__group">
                                            <input type="text" name="name" required></input>
                                            <label htmlFor="name">Name <span>*</span></label>
                                        </div>
                                        <div className="form__group">
                                            <input type="text" name="email" required></input>
                                            <label htmlFor="email">Email <span>*</span></label>
                                        </div>
                                        <div className="form__group">
                                            <input type="number" name="age" required></input>
                                            <label htmlFor="age">Age</label>
                                        </div>
                                        <div className="form__group">
                                            <input type="password" name="password" required></input>
                                            <label htmlFor="password">Password <span>*</span></label>
                                        </div>
                                    </div>
                                )
                        }
                        <div className="form__submit">
                            <IoIosArrowDropright />
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                }}
                            >
                                Continue
                        </button>
                        </div>
                    </form>
                    <button
                        className="login-create"
                        onClick={(e) => {
                            e.preventDefault()
                            this.setState((state) => ({ login: !state.login }))
                            document.querySelector('form').reset()
                        }}
                    >
                        {
                            this.state.login === true ? 'Create Account' : 'Login'
                        }
                    </button>
                </div>
            </div>
        )
    }
}

export default MainPage