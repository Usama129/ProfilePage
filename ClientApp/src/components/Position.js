import React, { Component } from 'react';
import './Position.css'

export default class Position extends Component {

    render() {
        return (
            <div>
                <div className="left">
                    <p className="title">{this.props.title}</p>
                    <p className="workplace">{this.props.workplace}</p>
 
                    <div>
                        <p className="duration">{this.props.startTime} - {this.props.endTime} |</p>
                        <p className="loc">{this.props.location}</p>
                    </div>
                </div>
                <div className="right">
                    <img src={this.props.image}/>
                </div>
                <p className="detail">{this.props.detail}</p>
            </div>
        )
    }
}