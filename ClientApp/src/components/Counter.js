import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class Counter extends Component {
  static displayName = Counter.name;

  constructor (props) {
    super(props);
      this.state = {
          currentCount: "loading",
          username: null
      };
      this.incrementCounter = this.incrementCounter.bind(this);
      
    }

    componentWillMount() {
        this._subscription = authService.subscribe(() => this.getData());
        this.getData();
    }

    async getData() {
        const user = await Promise.all([authService.getUser()])
        if (user[0] !== null) {
            const username = user[0]["name"]
            const token = await authService.getAccessToken();
            const response = await fetch('api/user/' + username, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            this.setState({ currentCount: data.count, username: username });
        }
        else
            this.setState({ currentCount: 0 })
    }

  incrementCounter () {
    this.setState({
        currentCount: this.state.currentCount + 1
    });

      if (this.state.username !== null) {
          fetch("api/user/setcount", {
              method: "post",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },

              //make sure to serialize your JSON body
              body: JSON.stringify({
                  userID: this.state.username,
                  Count: this.state.currentCount
              })
          })
              .then((response) => {
                  //do something awesome that makes the world a better place
              });
      }
  }

    render() {
      
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p>Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
      </div>
    );
  }
}
