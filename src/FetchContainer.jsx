import React from 'react';
import api from './api';

export default function(Component, type) {
  class FetchContainer extends React.Component {
    componentWillMount() {
      this.update(this.props);
    }
      
    componentWillUpdate(nextProps, nextState) {
      if(this.props.params.path !== nextProps.params.path) {
        this.update(nextProps);
      }
    }
    
    fullPath({params}) {
      return `${type}/${params.path}`;
    }
    
    update(props) {
      const fullPath = this.fullPath(props);
      const content = this.props.appState[fullPath];
      if(!content) {
        api.getContent(fullPath)
          .then((d) => this.props.updateAppState({[fullPath]: d}));
      }
    }
    
    render() {
      const content = this.props.appState[this.fullPath(this.props)];
    
      if(!content) return <div className="loading"></div>;
        
      return (
        <Component content={content} {...this.props} />
      );
    }
  }
  
  return FetchContainer;  
}
