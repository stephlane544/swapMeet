import React, { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom'
const { Provider, Consumer } = React.createContext()
const tokenAxios = axios.create()

tokenAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class ServiceProvider extends Component {
    constructor() {
        super()

        this.state = {
            users: [],
            user: JSON.parse(localStorage.getItem('user')) || {},
            token: localStorage.getItem('token') || ''
        }
    }

    signup = (userInfo) => {
        return axios.post("/auth/signup", userInfo)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("token", token);
                localStorage.setItem('user', JSON.stringify(user));
                this.setState({
                    user,
                    token
                });
                return response;
            })
    }

    login = (credentials) => {
        return axios.post('/auth/login', credentials).then(response => {
            const { token, user } = response.data
            console.log(response.data)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            this.setState({
                user,
                token
            })
            return response
        })
    }

    editUser = (editedUser) => {
        console.log('here')
        return tokenAxios.put("/api/edituser", editedUser).then(response => {
            console.log('here')
            return response;
        })
    }

    editSwapper = (_id, editedSwapper) => {
        console.log(editedSwapper)
        return axios.put(`/users/${_id}`, editedSwapper).then(res => {
            return res
        })
    }

    logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.setState({
            user: {},
            token: ''
        }, this.props.history.push('/'))
        
    }

    getUsers = () => {
        axios.get("/users").then(response => {
            this.setState({
                users: response.data
            })
            localStorage.setItem('users', JSON.stringify(response.data))
        })
    }
    

    render() {
        return (
            <Provider value = {{
                logout: this.logout,
                login: this.login,
                signup: this.signup,
                editUser: this.editUser,
                getUsers: this.getUsers,
                editSwapper: this.editSwapper,
                ...this.state
            }}>
                {this.props.children}
            </Provider>

        )
    }
}

export default withRouter(ServiceProvider);

export function withServices (C) {
    return props => <Consumer>
                        {value => <C {...value} {...props} />}
                    </Consumer>
}