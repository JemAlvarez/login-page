import React from 'react'
import { history } from '../routers/AppRouter'
import Modal from 'react-modal'
import { IoMdClose, IoIosLogOut } from 'react-icons/io'
import { FaImage, FaUser } from 'react-icons/fa'

class Account extends React.Component {
    state = {
        name: '',
        age: '',
        email: '',
        id: '',
        url: 'https://ja-task-manager-api.herokuapp.com',
        img: 'https://heartland.cc/wp-content/uploads/2018/02/male-placeholder.jpg',
        edit: 'edit',
        modalOpen: false,
        imgError: '',
        noFileError: '',
        file: '',
        loading: ''
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
        console.log('edit info')
        // if edit state is edit -> change to save
        // if edit state is save -> change to edit & send request to update data (if data changed)
    }
    onRequestClose = () => {
        this.setState(() => ({ modalOpen: false, file: '', imgError: '' }))
        document.querySelector('.img-form').reset()
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
                                    modalOpen: true
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
                            <FaUser /> {this.state.edit}
                        </button>
                    </div>
                </div>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalOpen}
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
                                            this.setState(() => ({ loading: ''}))
                                            if (response.status === 400) {
                                                this.setState(() => ({ imgError: 'Upload an image under 1 MB' }))
                                                return
                                            }
                                            this.setState(() => ({ file: ''}))
                                            window.location.reload()
                                            this.onRequestClose()
                                        })
                                }}
                            >
                                <p>{this.state.imgError}</p>
                                <p>{this.state.noFileError}</p>
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
            </div>
        )
    }
}

export default Account