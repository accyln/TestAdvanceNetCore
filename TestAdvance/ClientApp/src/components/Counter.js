import React, { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {
  
  render() {
    return (
      <div>
        <h1>{this.props.auth}</h1>

        
      </div>
    );
  }
}

function mapStateToProps(state){
  return {auth:state.authReducer}
}

export default connect(mapStateToProps)(Counter);
