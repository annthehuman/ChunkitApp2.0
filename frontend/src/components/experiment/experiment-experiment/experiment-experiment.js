import React, {Component} from 'react';
import TestExperimentComponent from '../experiment-experiment-component/experiment-experiment-component';

export default class ExperimentExperiment extends Component {
    constructor(props) {
        super(props);
        // this.htmlDecode = this.htmlDecode.bind(this)
        }
        render() {
            return(
            <>  <h2>The experimental task</h2>
                <TestExperimentComponent user={this.props.user} data={this.props.data} nextPage={this.props.nextPage} />
            </>
         )}
    }