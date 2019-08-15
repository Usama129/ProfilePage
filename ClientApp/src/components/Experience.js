import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Experience.css'
import authService from './api-authorization/AuthorizeService'
import Position from './Position';

export default class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: [] , loading: true };
    }

    componentDidMount() {
        this.populateExperience();
    }

    static setPositions(positions) {
        const exp = []
        for (const p of positions) {
            console.log(p)
            exp.push(
                <Position
                    title={p.title}
                    workplace={p.workplace}
                    location={p.location}
                    startTime={p.startTime}
                    endTime={p.endTime}
                    image={p.image}
                    detail={p.detail}
                />)
        }
        return exp;
    }

    async populateExperience() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/user/' + this.props.user + '/positions', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ positions: data, loading: false })
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Experience.setPositions(this.state.positions);
        return (
            <div className="Experience">
                <h4>Experience</h4>
                {contents}
            </div>
            )        
    }
}