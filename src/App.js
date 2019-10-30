import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import './App.css';
import { STATUS_DELAYED, STATUS_DONE, STATUS_INPROGRESS } from './lineStatus';

const data = {
  data: [
    {id: 1, line_name: '第1調剤', product_name: "キンダロンO", status: STATUS_INPROGRESS, start_date: new Date("2019-08-01 00:00"), end_date: new Date("2019-08-12 00:00" )},
    {id: 2, line_name: '第2調剤', product_name: "マイアロンC", status: STATUS_DONE, start_date: new Date("2019-08-01 00:00"), end_date: new Date("2019-08-10 00:00")},
    {id: 3, line_name: '第3調剤', product_name: "マイアロンC", status: STATUS_DELAYED, start_date: new Date("2019-08-06 00:00"),  end_date: new Date("2019-08-8 00:00")},
    {id: 2, line_name: '第4調剤', product_name: "マイアロンC", status: STATUS_DELAYED, start_date: new Date("2019-08-01 00:00"), end_date: new Date("2019-08-5 00:00")},
    {id: 4, line_name: '第5調剤', product_name: "マイアロンC", status: STATUS_DONE, start_date: new Date("2019-08-01 00:00"), end_date: new Date("2019-08-15 00:00")},
    {id: 5, line_name: '第6調剤', product_name: "マイアロンC", status: STATUS_DELAYED, start_date: new Date("2019-08-09 00:00"), end_date: new Date("2019-08-18 00:00")},
    {id: 6, line_name: '第7調剤', product_name: "マイアロンC", status: STATUS_DONE, start_date: new Date("2019-08-11 00:00"), end_date: new Date("2019-08-22 00:00")},
    {id: 7, line_name: '第8調剤', product_name: "マイアロンC", status: STATUS_INPROGRESS, start_date: new Date("2019-08-01 00:00"), end_date: new Date("2019-08-12 00:00")},
  ],
  links:[
    {id:1, source:2, target:3, type:"0"},
    {id:2, source:3, target:4, type:"0"},
    {id:3, source:5, target:6, type:"0"}
  ]
};


class App extends Component {
  state = {
    currentZoom: 'Days',
    messages: [],
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessate = { message };
    const messages = [
      newMessate,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    console.log(item.product_name);
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  };

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  };

  render() {
    const { currentZoom, messages } = this.state;
    return (
        <div>
          <div className="zoom-bar">
            <Toolbar
                zoom={currentZoom}
                onZoomChange={this.handleZoomChange}
            />
          </div>
          <div className="smf production-gantt">
            <Gantt
                tasks={data}
                zoom={currentZoom}
                onDataUpdated={this.logDataUpdate}
            />
          </div>
          <MessageArea
              messages={messages}
          />
        </div>
    );
  }
}
export default App;
