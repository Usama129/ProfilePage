import React, { Component } from 'react';
import Position from './Position';
import authService from './api-authorization/AuthorizeService'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux'

class Education extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this)
        this.updateModalState = this.updateModalState.bind(this)
        this.saveModal = this.saveModal.bind(this)
        this.setQualifications = this.setQualifications.bind(this)
        this.state = {
            qualifications: [], loading: true, modalOpen: false, modalState: {}
        };
    }

    componentDidMount() {
        this.populateEducation();
    }

    onOpenModal = () => {
        this.setState({ modalOpen: true });

    };

    onCloseModal = () => {
        this.setState({ modalOpen: false });
    };

    updateModalState(data) {
        let prop = { [data.id]: data.value }
        let temp = { ...this.state.modalState, ...prop }
        this.setState({ modalState: temp })
    }

    saveModal() {
        let temp = this.state.modalState
        let add = { userID: this.props.user, type: "Education" }
        let data = { ...temp, ...add}
        fetch("api/user/addposition", {
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
                this.onCloseModal();
                this.update();
            });


    }

    update() {
        this.populateEducation();
        this.forceUpdate();
    }

    setQualifications(qualifications) {
        const edu = []
        let education = ""
        for (const q of qualifications) {
            education += " " + q.workplace + ","
            edu.push(
                <Position
                    ID={q.id}
                    title={q.title}
                    workplace={q.workplace}
                    location={q.location}
                    startTime={q.startTime}
                    endTime={q.endTime}
                    image={q.image}
                    detail={q.detail}
                    update={this.update}
                />)
        }
        education = education.slice(0, -1)
        this.props.dispatch({
            type: 'UPDATE_DATA',
            data: { education: education }
        })
        return edu;
    }

    async populateEducation() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/user/' + this.props.user + '/positions/edu', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ qualifications: data, loading: false })
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.setQualifications(this.state.qualifications);
        return (
            <div className="Education">
                <h4 className="heading" >Education</h4>
                <a className="add" href="javascript:void(0);" onClick={this.onOpenModal}>
                    <img border="0" alt="Add" src="data:image/png;base64,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" width="20" height="20" />
                </a>
                {contents}
                <Modal open={this.state.modalOpen} onClose={this.onCloseModal} center>
                    <h4>Add Qualification</h4>
                    <input id="title" type="text" placeholder="Programme Name, Area"
                        onInput={e => this.updateModalState(e.target)}
                    />
                    <input id="workplace" type="text" className="workplace" placeholder="Institution"
                        onInput={e => this.updateModalState(e.target)}
                    />
                    <div className="speloc" >
                        <input id="startTime" type="text" className="startTime" placeholder="Start Date (Month, Year)"
                            onInput={e => this.updateModalState(e.target)}
                        />
                        <span>&nbsp;-&nbsp;</span>
                        <input id="endTime" type="text" className="endTime" placeholder="End Date (Month, Year)"
                            onInput={e => this.updateModalState(e.target)}
                        />
                        <span>&nbsp;|&nbsp;</span>
                        <input id="location" type="text" className="loc" placeholder="Location"
                            onInput={e => this.updateModalState(e.target)}
                        />
                    </div>
                    <textarea id="detail" className="detail" placeholder="Programme details"
                        onInput={e => this.updateModalState(e.target)}
                    />
                    <a href="javascript:void(0);" onClick={this.saveModal} className="btn">Save</a>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return 0;
}

export default connect(mapStateToProps)(Education);