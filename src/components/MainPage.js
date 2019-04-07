import React from 'react'

class MainPage extends React.Component {
    state = {
        login: true
    }
    render() {
        return (
            <div>
                <h1>{this.state.login === true ? 'Login' : 'Create Account'}</h1>
                <p>Welcome back! {this.state.login === true ? 'Login' : 'Create an account'} to access the app.</p>
                <form>
                    {
                        (this.state.login === true) ? (
                            <div>
                                <input type="text" placeholder="Email" required></input>
                                <input type="password" placeholder="Password" required></input>
                            </div>
                        ) : (
                                <div>
                                    <input type="text" placeholder="Name" required></input>
                                    <input type="text" placeholder="Email" required></input>
                                    <input type="number" placeholder="Age"></input>
                                    <input type="password" placeholder="Password" required></input>
                                </div>
                            )
                    }
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                        }}
                    >
                        Continue
                    </button>
                </form>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        this.setState((state) => ({ login: !state.login }))
                    }}
                >
                    {
                        this.state.login === true ? 'Create Account' : 'Login'
                    }
                </button>
            </div>
        )
    }
}

export default MainPage