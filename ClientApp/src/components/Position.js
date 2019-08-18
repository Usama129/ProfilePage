import React, { Component } from 'react';
import './Position.css'

export default class Position extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.delete = this.delete.bind(this)
        this.state = {
            editing: false,
            data: {}
        };
    }

    componentWillMount() {
        this.setState({data: this.props})
    }

    update(data) {
        let prop = { [data.id]: data.value }
        let temp = {...this.state.data, ...prop}
        this.setState({data: temp})
    }

    saveChanges() {
        console.log(this.state.data)
        fetch("api/user/setposition", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(this.state.data)
        })
            .then((response) => {
                //do something awesome that makes the world a better place
                if (response.ok) {
                    this.setState({ editing: false })
                }
            });
        
    }

    delete() {
        fetch("api/user/deleteposition", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(this.state.data)
        })
            .then((response) => {
                //do something awesome that makes the world a better place
                this.setState({ editing: false })
                this.props.update()
            });
    }
   

    render() {
       
        let position = this.state.data

        return (
            <div>
                {   // non-editing state
                    !this.state.editing &&
                    <div className="position">
                        <div className="left">
                            <p className="title">{position.title}</p>
                            <p className="workplace">{position.workplace}</p>

                            <div>
                                <p className="duration">{position.startTime} - {position.endTime}</p>
                                <span>&nbsp;|&nbsp;</span>
                                <p className="loc">{position.location}</p>
                            </div>
                        </div>
                        <div className="right">
                            <a href="javascript:void(0);"  onClick={() => this.setState({ editing: true })} className="btn">Edit</a>
                            <img className="img" src={position.image} />
                        </div>
                        <p className="detail">{position.detail}</p>
                    </div>
                }

                {   // editing state
                    this.state.editing &&
                    <div className="position">
                        <div className="left">
                            <input id="title" type="text" className="title" defaultValue={position.title}
                                onInput={e => this.update(e.target)}
                            />
                            
                            
                            <input id="workplace" type="text" className="workplace" defaultValue={position.workplace}
                                onInput={e => this.update(e.target)}
                            />
                            <div className="speloc" >
                                <input id="startTime" type="text" className="startTime" defaultValue={position.startTime}
                                    onInput={e => this.update(e.target)}
                                />
                                
                                <input id="endTime" type="text" className="endTime" defaultValue={position.endTime}
                                    onInput={e => this.update(e.target)}
                                />
                                <span>&nbsp;|&nbsp;</span>
                                <input id="location" type="text" className="loc" defaultValue={position.location}
                                    onInput={e => this.update(e.target)}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <a href="javascript:void(0);" onClick={this.saveChanges} className="btn">Save</a>
                            <a href="javascript:void(0);" onClick={this.delete} className="btn">Delete</a>
                            <img className="img" src={position.image} />
                        </div>
                        <textarea id="detail" className="detail" defaultValue={position.detail}
                            onInput={e => this.update(e.target)}
                        />
                    </div>
                }
            </div>
        )
    }
}