import React from 'react'
import { history } from '../routers/AppRouter'

class Account extends React.Component {
    state = {
        name: '',
        age: '',
        email: '',
        id: '',
        url: 'https://ja-task-manager-api.herokuapp.com',
        img: 'https://heartland.cc/wp-content/uploads/2018/02/male-placeholder.jpg',
        edit: 'edit'
    }
    componentWillMount() {
        if (!localStorage.jwt) {
            localStorage.setItem('jwt', '')
            history.push('/')
        }
        fetch(`${this.state.url}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(res => res.json())
            .then(data => {
                fetch(`${this.state.url}/users/${data._id}/avatar`)
                    .then(res => {
                        if (res.status === 200) {
                            this.setState((state) => ({
                                img: `${state.url}/users/${data._id}/avatar`
                            }))
                        }
                    })
                this.setState(() => ({
                    name: data.name,
                    age: data.age,
                    email: data.email,
                    id: data._id
                }))
            })
            .catch(e => console.log(e))
    }
    logout() {
        fetch(`${this.state.url}/users/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(response => {
            localStorage.setItem('jwt', '')
            history.push('/')
        }).catch(e => console.log(e))

        this.setState(() => ({
            name: '',
            email: '',
            age: '',
            id: '',
            img: ''
        }))
    }
    editInfo() {
        console.log('edit info')
        // if edit state is edit -> change to save
        // if edit state is save -> change to edit & send request to update data (if data changed)
    }
    render() {
        return (
            <div className="account container">
                <button
                    className="account__logout btn"
                    onClick={() => { this.logout() }}
                >
                    Logout
                </button>
                <div className="account__container">
                    <div className="user__card">
                        <img
                            className="user__img"
                            src={this.state.img}
                            onClick={() => {
                                console.log('edit img')
                            }}
                        ></img>
                        <h1 className="user__name">{this.state.name || '...'}</h1>
                        {
                            this.state.edit === 'edit' ? (
                                <div>
                                    <p className="user__subheading">Email</p>
                                    <p className="user__text">{this.state.email || '...'}</p>
                                    <p className="user__subheading">Age</p>
                                    <p className="user__text">{`${this.state.age}` || '...'}</p>
                                </div>
                            ) : (
                                    <form>
                                        <p className="user__subheading">Email</p>
                                        <input type="text" value={this.state.email}></input>
                                        <p className="user__subheading">Age</p>
                                        <input type="number" value={this.state.age}></input>
                                    </form>
                                )
                        }
                        <button
                            className="user__edit btn"
                            onClick={() => { this.editInfo() }}
                        >
                            {this.state.edit}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account