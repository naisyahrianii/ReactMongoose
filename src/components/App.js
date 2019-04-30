import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import {keepLogin} from '../actions'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import EditProfile from './EditProfile'

const cookie = new cookies() 

class App extends Component {
    componentDidMount() {
        var userCookie = cookie.get("masihLogin");
        var idCookie = cookie.get("idLogin");

        if (userCookie !== undefined || userCookie !== undefined) {
          this.props.keepLogin(userCookie, idCookie);
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/editprofile' component={EditProfile}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null,{keepLogin})(App)