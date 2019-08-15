import React, { Component } from 'react';
import Head from './Head'
import authService from './api-authorization/AuthorizeService';
import { connect } from 'react-redux'
import './Home.css'
import Experience from './Experience';

class Home extends Component {
  static displayName = Home.name;


    constructor(props) {
        super(props);
        this.state = { user: "", loading: true };
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
            const data = await response.json();
            this.props.dispatch({
                type: 'GET_DATA',
                data: data
            })
            this.setState({ user: username, loading: false })
        }
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <div>
                <Head />
                <Experience user={this.state.user}/>
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
