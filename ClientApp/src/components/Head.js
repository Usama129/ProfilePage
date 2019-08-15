import React, { Component } from 'react';
import './Head.css'
import { connect } from 'react-redux'
import authService from './api-authorization/AuthorizeService';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'

class Head extends Component {
    

    update = (data) => {
        data.userID = this.props.userID
        console.log(data)
        fetch("api/user/set", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(data)
        })
            .then((response) => {
                //do something awesome that makes the world a better place
                if (response.ok) {
                    this.props.dispatch({
                        type: 'UPDATE_DATA',
                        data: data
                    })
                }
            });
      
    }

    render() {
        

        return (
            <div className="Head" >
                <img className="Icon" src="https://media.licdn.com/dms/image/C5603AQGsjaU-Vh7hbg/profile-displayphoto-shrink_200_200/0?e=1571270400&v=beta&t=pYSyNGr0KMacZMJpgssBpI6JiZQWcTPiSB4Q2RcRpTs" />
                <div className="Tags">
                    <RIEInput
                        className="name"
                        value={this.props.name}
                        change={this.update}
                        propName='name'
                     />

                    <RIEInput
                        className="headtitle"
                        value={this.props.title}
                        change={this.update}
                        propName='title'
                    />
                    <div className="locspe" >
                        <RIEInput
                            className="Location"
                            value={this.props.location}
                            change={this.update}
                            propName='location'
                        />
                        <span>&nbsp;|&nbsp;</span>
                       <RIEInput
                            className="Specialty"
                            value={this.props.specialty}
                            change={this.update}
                            propName='specialty'
                       />
                    </div>
                    <p className="edu">Education</p>
                    <p className="pre">Previous</p>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        name: state.user.name,
        title: state.user.title,
        location: state.user.location,
        specialty: state.user.specialty,
        userID: state.user.userID
    }
}

export default connect(mapStateToProps)(Head);
