import React, { Component } from 'react';
import Head from './Head'
import authService from './api-authorization/AuthorizeService';
import { connect } from 'react-redux'
import './Home.css'
import Experience from './Experience';
import Education from './Education';

class Home extends Component {
  static displayName = Home.name;


    constructor(props) {
        super(props);
        this.state = { user: "", loading: true, displayMessage: "Loading..." };
    }

    componentWillMount() {
        this.getUserData();
    }

    async getUserData() {
        const token = await authService.getAccessToken();
        const user = await Promise.all([authService.getUser()])
        if (user[0] !== null) {
            const username = await user[0]["name"]
            const response = await fetch('api/user/' + username, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });

            

            if (response.ok) {
                if (response.status == 204) {
                    this.setState({ displayMessage: "We do not have any data on you... yet ;)" })
                    return;
                }
                const data = await response.json();
                this.props.dispatch({
                    type: 'GET_DATA',
                    data: data
                })
                this.setState({ user: username, loading: false })
            }
            else
                this.setState({ displayMessage: "HTTP "+response.status })
        }
    }

    render() {

        let contents = this.state.loading
            ? <p><em>{this.state.displayMessage}</em></p>
            : <div>
                <Head />
                <Experience user={this.state.user} />
                <Education user={this.state.user} />
              </div>

        return (
            <div className="Home">
                {contents}
            </div>
        );
  }
}

const mapStateToProps = function (state) {
    let value
    return {
        value: value
    }
}

export default connect(mapStateToProps)(Home);
