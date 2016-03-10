import React, {Component} from 'react';
import api from './api';
import merge from 'lodash/merge';
import {Link} from 'react-router';
import Footer from './Footer';

import style from '../styles/home.css';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {appState: props.initialAppState};
  }
  
  componentWillMount() {
    const {appState} = this.state;
    if(!appState.index.posts.length) {
      api.getIndex().then((index) => this.updateAppState({index}));
    }
    
    if(typeof window !== 'undefined' && window.DEV_MODE) {
      this.initLiveLoad();
    }
  }
  
  initLiveLoad() {
    const host = window.document.location.host;
    const ws = new WebSocket('ws://' + host);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "change":
          api.getIndex().then((index) => this.updateAppState({index}));
          api.getContent(data.path).then((d) => this.updateAppState({[data.path]: d}));
          break;
        case "add":
          api.getIndex().then((index) => this.updateAppState({index}));
          api.getContent(data.path).then((d) => this.updateAppState({[data.path]: d}));
          break;
        case "remove":
          api.getIndex().then((index) => this.updateAppState({index}));
          break;  
      }
    };
  }
  
  updateAppState = (newState) => {
    this.setState({appState: merge(this.state.appState, newState)});
  };
  
  render() {
    const {children, location} = this.props;
    const {index} = this.state.appState;
    
    let childrenWithProps = null;

    if(children) {
      childrenWithProps = React.cloneElement(children, {
        key: location.pathname,
        updateAppState: this.updateAppState, 
        appState: this.state.appState
      });
    }

    if(!index) return (
      <div className="loading"></div>  
    );
    
    return (
      <div className={style.home}>
        {childrenWithProps}
        <Footer index={index} />
      </div>
    )
  }
}