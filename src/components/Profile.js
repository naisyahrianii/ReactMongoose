import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import cookies from 'universal-cookie'
import { 
    Jumbotron,
    Button, } from 'reactstrap';

import axios from '../config/axios'

const cookie = new cookies()

class Profile extends Component {
    state = {
        data: undefined, // data.user
        updated: false
    };

    componentDidMount() {
        const userid = cookie.get('idLogin')
        this.getProfile(userid);
    }

    getProfile = async (userid) => {        
        
        try {
            const res = await axios.get(`/users/me/${userid}`);
            this.setState({
              data: res.data
            });
            
        } catch (e) {
            
        }
    };

    fileUpload = async (id) => {
        var formData = new FormData()
        var imagefile = this.gambar
        formData.append("avatar", imagefile.files[0])
        
        try {
            await axios.post(`/users/${id}/avatar`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            this.getProfile(id)
        } catch (e) {
            console.log(e.response.data);
            
        }
          

    }

    render(){
        
        if(cookie.get('masihLogin') !== undefined){
            if(this.state.data !== undefined){
                const {name, age, email} = this.state.data.user
                return(
                    <div className="container mt-5">
                        <Jumbotron >
                            <img  src={this.state.data.photo} alt={this.state.data.user.name} key={new Date()}/>
                            <h1 className="display-3">Hello, {name}!</h1>
                            <p className="lead">{name} | {age} | {email}</p>
                            <div className="custom-file">
                                <input type="file" id="myfile" multiple="multiple"  ref={input => this.gambar = input}/>
                            </div>
                            <Button color="primary" onClick={() => this.fileUpload(this.props.id)}>Upload</Button>
                        </Jumbotron>
                    </div>
                )
            }
    
            return <h1>Loading</h1>
        }

        return <Redirect to='/login'/>
        
        
    }
}

const mapStateToProps = state => {
    return {id: state.auth.id}
}

export default connect(mapStateToProps)(Profile)