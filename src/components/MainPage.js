import React from 'react'
import { history } from '../routers/AppRouter'
import { IoIosArrowDropright } from "react-icons/io";

class MainPage extends React.Component {
    state = {
        login: true
    }
    postData(e) {
        const url = 'https://ja-task-manager-api.herokuapp.com'
        e.preventDefault()
        if (this.state.login) {
            const email = document.querySelector('#emailL')
            const pw = document.querySelector('#passwordL')

            const data = {
                email: email.value,
                password: pw.value
            }

            fetch(`${url}/users/login`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    console.log('Logedin')
                    console.log(response)
                    localStorage.setItem('jwt', response.token)
                    history.push('/account')
                })
                .catch(error => console.error('Error:', error));

            email.value = ''
            pw.value = ''
        } else {
            const email = document.querySelector('#emailC')
            const pw = document.querySelector('#passwordC')
            const rePw = document.querySelector('#re-passwordC')
            const age = document.querySelector('#ageC')
            const name = document.querySelector('#nameC')

            if (pw.value !== rePw.value) {
                return console.log('Passwords dont match.')
            }

            const data = {
                name: name.value,
                email: email.value,
                age: age.value,
                password: pw.value
            }

            fetch(`${url}/users`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    console.log('Account Created/Logedin')
                    console.log(response)
                    localStorage.setItem('jwt', response.token)
                    history.push('/account')
                })
                .catch(error => console.error('Error:', error));

            name.value = ''
            email.value = ''
            age.value = ''
            pw.value = ''
        }
    }
    render() {
        return (
            <div className="container login">
                <div className="login__container">
                    <div className="header__wrapper">
                        <h1 className="header">{this.state.login === true ? 'Login' : 'Create Account'}</h1>
                    </div>
                    <p className="welcome">Welcome{this.state.login === true ?
                        ' back' : ''}! {this.state.login === true ?
                            'Login' :
                            'Create an account'} to access the app.</p>
                    <form
                        className="form"
                        onSubmit={(e) => { this.postData(e) }}
                    >
                        {
                            (this.state.login === true) ? (
                                <div className="form__login">
                                    <div className="form__group">
                                        <input id="emailL" type="text" name="email" required></input>
                                        <label htmlFor="email">Email <span>*</span></label>
                                    </div>
                                    <div className="form__group">
                                        <input id="passwordL" type="password" name="password" required></input>
                                        <label htmlFor="password">Password <span>*</span></label>
                                    </div>
                                </div>
                            ) : (
                                    <div className="form__create">
                                        <div className="form__group">
                                            <input id="nameC" type="text" name="name" required></input>
                                            <label htmlFor="name">Name <span>*</span></label>
                                        </div>
                                        <div className="form__group">
                                            <input id="emailC" type="text" name="email" required></input>
                                            <label htmlFor="email">Email <span>*</span></label>
                                        </div>
                                        <div className="form__group">
                                            <input id="ageC" type="number" name="age" required></input>
                                            <label htmlFor="age">Age</label>
                                        </div>
                                        <div className="form__group">
                                            <input id="passwordC" type="password" name="password" required></input>
                                            <label htmlFor="password">Password <span>*</span></label>
                                        </div>
                                        <div className="form__group">
                                            <input id="re-passwordC" type="password" name="re-password" required></input>
                                            <label htmlFor="re-password">Password Again <span>*</span></label>
                                        </div>
                                    </div>
                                )
                        }
                        <div className="form__submit">
                            <IoIosArrowDropright />
                            <input
                                type="submit"
                                value="Continue"
                            ></input>
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
                            this.state.login === true ?
                                'Don\'t have an account? Create one!' :
                                'Already have an account? Login!'
                        }
                    </button>
                </div>
            </div>
        )
    }
}

export default MainPage