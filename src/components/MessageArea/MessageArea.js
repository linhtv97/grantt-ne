import React, { Component } from 'react';

class MessageArea extends Component {
  render() {
    const messages = this.props.messages.map(({ message }) => {
      return <li key={ Math.random() }>{message}</li>
    });

    return (
      <div className="message-area">
        <h3>Messages:</h3>
        <ul>
          {messages}
        </ul>git remote add origin git@github.com:linhtv97/grantt-editor.git
      </div>
    );
  }
}

MessageArea.defaultProps = {
  messages: []
};

export default MessageArea;
