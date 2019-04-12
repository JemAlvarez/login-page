import React from 'react'
import { history } from '../routers/AppRouter'
import Modal from 'react-modal'
import { IoMdClose, IoIosLogOut } from 'react-icons/io'
import { FaImage, FaUser, FaTrash, FaCheck } from 'react-icons/fa'

class Account extends React.Component {
    state = {
        name: '',
        age: '',
        email: '',
        id: '',
        url: 'https://ja-task-manager-api.herokuapp.com',
        img: 'https://heartland.cc/wp-content/uploads/2018/02/male-placeholder.jpg',
        imgOpen: false,
        editOpen: false,
        imgError: '',
        noFileError: '',
        file: '',
        loading: '',
        invalidEmail: '',
        emailUsed: '',
        deleteOpen: false
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
            img: 'https://heartland.cc/wp-content/uploads/2018/02/male-placeholder.jpg'
        }))
    }
    editInfo() {
        this.setState(() => ({ editOpen: true }))
        // if edit state is edit -> change to save
        // if edit state is save -> change to edit & send request to update data (if data changed)
    }
    onRequestClose = () => {
        if (this.state.imgOpen === true) {
            document.querySelector('.img-form').reset()
        }
        this.setState(() => ({ imgOpen: false, editOpen: false, deleteOpen: false, file: '', imgError: '' }))
        document.querySelector('#app').setAttribute("style", "position: static")
    }
    onAfterOpen() {
        document.querySelector('#app').setAttribute("style", "position: fixed")
    }
    render() {
        return (
            <div className="account container">
                <button
                    className="account__logout btn"
                    onClick={() => { this.logout() }}
                >
                    <IoIosLogOut /> Logout
                </button>
                <div className="account__container">
                    <div className="user__card">
                        <div
                            className="img__container"
                            onClick={() => {
                                this.setState(() => ({
                                    imgOpen: true
                                }))
                            }}
                        >
                            <img
                                className="user__img"
                                src={this.state.img}
                            ></img>
                            <div className="img__overlay"><FaImage /></div>
                        </div>
                        <h1 className="user__name">{this.state.name || '...'}</h1>
                        <div>
                            <p className="user__subheading">Email</p>
                            <p className="user__text">{this.state.email || '...'}</p>
                            <p className="user__subheading">Age</p>
                            <p className="user__text">{`${this.state.age}` || '...'}</p>
                        </div>
                        <div className="user__btns">
                            <button
                                className="user__delete btn"
                                onClick={() => { this.setState(() => ({ deleteOpen: true })) }}
                            >
                                <FaTrash />
                            </button>
                            <button
                                className="user__edit btn"
                                onClick={() => { this.editInfo() }}
                            >
                                <FaUser /> Edit
                            </button>
                        </div>
                    </div>
                </div>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.imgOpen}
                    onRequestClose={this.onRequestClose}
                    onAfterOpen={this.onAfterOpen}
                    closeTimeoutMS={200}
                    className="modal"
                >
                    <div className="modal__body" style={{ height: '100%', width: '100%' }}>
                        <div>
                            <p>Upload Image</p>
                            <form
                                className="img-form"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    const formData = new FormData()
                                    formData.append('avatar', this.state.file)
                                    fetch(`${this.state.url}/users/me/avatar`, {
                                        method: 'POST',
                                        body: formData,
                                        headers: {
                                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                                        }
                                    })
                                        .then(response => {
                                            this.setState(() => ({ loading: '' }))
                                            if (response.status === 400) {
                                                this.setState(() => ({ imgError: 'Upload an image under 1 MB' }))
                                                return
                                            }
                                            this.setState(() => ({ file: '' }))
                                            window.location.reload()
                                            this.onRequestClose()
                                        })
                                }}
                            >
                                <p className="form-error">{this.state.imgError}</p>
                                <p className="form-error">{this.state.noFileError}</p>
                                <input type="file" name="avatar" id="avatar" onChange={() => {
                                    this.setState(() => ({
                                        file: avatar.files[0],
                                        noFileError: ''
                                    }))
                                }}></input>
                                <button
                                    className="file-btn btn"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const avatar = document.querySelector('#avatar')
                                        avatar.click()
                                    }}
                                >
                                    Choose file ...
                                </button>
                                <p>{this.state.file.name}</p>
                                <input
                                    className="btn"
                                    type="submit"
                                    value={`Update ${this.state.loading}`}
                                    name="submit"
                                    onClick={(e) => {
                                        if (this.state.file === '') {
                                            this.setState(() => ({ loading: '', noFileError: 'No file selected' }))
                                            return
                                        }
                                        this.setState(() => ({ loading: '...' }))
                                    }}
                                ></input>
                            </form>
                        </div>
                    </div>
                    <button
                        className="modal__close btn"
                        onClick={() => {
                            this.onRequestClose()
                        }}
                    >
                        <IoMdClose />
                    </button>
                </Modal>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.editOpen}
                    onRequestClose={this.onRequestClose}
                    onAfterOpen={this.onAfterOpen}
                    closeTimeoutMS={200}
                    className="modal"
                >
                    <div>
                        <p>Edit profile</p>
                        <form
                            className="edit-form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                const email = document.querySelector('#emailE')
                                const age = document.querySelector('#ageE')
                                const name = document.querySelector('#nameE')

                                const data = {
                                    name: name.value,
                                    email: email.value,
                                    age: age.value
                                }

                                fetch(`${this.state.url}/users/me`, {
                                    method: 'PATCH',
                                    body: JSON.stringify(data),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                                    }
                                }).then(res => res.json())
                                    .then(response => {
                                        if (response.age) {
                                            name.value = ''
                                            email.value = ''
                                            age.value = ''
                                            this.setState(() => ({ loading: '' }))
                                            window.location.reload()
                                            this.onRequestClose()
                                            return
                                        }

                                        if (response.errmsg) {
                                            this.setState(() => ({ emailUsed: 'Email already in used.', invalidEmail: '' }))
                                        } else {
                                            this.setState(() => ({ emailUsed: '' }))
                                        }

                                        if (response.errors.email) {
                                            this.setState(() => ({ invalidEmail: 'Email is invalid' }))
                                        } else {
                                            this.setState(() => ({ invalidEmail: '' }))
                                        }
                                    })
                            }}
                        >
                            <p className="form-error">{this.state.invalidEmail}</p>
                            <p className="form-error">{this.state.emailUsed}</p>
                            <div className="form__group">
                                <input id="nameE" type="text" name="name" defaultValue={this.state.name} required></input>
                                <label htmlFor="name">Name <span>*</span></label>
                            </div>
                            <div className="form__group">
                                <input id="emailE" type="text" name="email" defaultValue={this.state.email} required></input>
                                <label htmlFor="email">Email <span>*</span></label>
                            </div>
                            <div className="form__group">
                                <input id="ageE" type="number" name="age" defaultValue={this.state.age} required></input>
                                <label htmlFor="age">Age <span>*</span></label>
                            </div>
                            <input
                                className="btn"
                                type="submit"
                                value={`Update ${this.state.loading}`}
                                name="submit"
                            ></input>
                        </form>
                        <button
                            className="modal__close btn"
                            onClick={() => {
                                this.onRequestClose()
                            }}
                        >
                            <IoMdClose />
                        </button>
                    </div>
                </Modal>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.deleteOpen}
                    onRequestClose={this.onRequestClose}
                    onAfterOpen={this.onAfterOpen}
                    closeTimeoutMS={200}
                    className="modal"
                >
                    <div>
                        <p>Delete Account?</p>
                        <p className="form-error">Are you sure you want to delete your account? This cannot be undone.</p>
                        <div className="user__btns">
                            <button
                                className="user__check modal__close btn"
                                onClick={() => {
                                    fetch(`${this.state.url}/users/me`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                                        }
                                    })
                                        .then(response => {
                                            localStorage.removeItem('jwt')
                                            history.push('/')
                                        })
                                }}
                            >
                                <FaCheck />
                            </button>
                            <button
                                className="modal__close btn user__delete"
                                onClick={() => {
                                    console.log('hey')
                                    this.onRequestClose()
                                }}
                            >
                                <IoMdClose />
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Account