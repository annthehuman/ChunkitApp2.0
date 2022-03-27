import React, {Component} from 'react';
import TestExperimentComponent from '../test-experiment-component/test-experiment-component';

export default class TestExperiment extends Component {
    constructor(props) {
        super(props);
        // this.htmlDecode = this.htmlDecode.bind(this)
        }
        render() {
            return(
            <>  <h3>The experimental task</h3>
                <TestExperimentComponent  toggle = {this.props.toggle} active={this.props.activeTabTest}/>
            </>
         )}
    }