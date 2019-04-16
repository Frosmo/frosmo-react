/* global frosmo */

import React, { Component } from 'react';
import ChildComponent from './ChildComponent';

import { FrosmoPropTypes } from "./shapes";

const FrosmoComponentDefaultProps = {
    children: null,
    component: null,
    defaultComponent: null,
    modificationContext: null,
};

class FrosmoPlacement extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { modificationContext } = this.props;
        if (modificationContext !== null) {
            // start tracking the message
            modificationContext.setTrackableElements(this.frosmoMessage);
            modificationContext.startTracking();
        }
    }

    render() {
        // Pass state as immutable props
        const element = <ChildComponent {...this.props} />;

        // Wrap in fragment
        if (this.props.useFragment) {
            return <React.Fragment>{element}</React.Fragment>;
        }

        // Wrap inside a trackable div element
        return (
            <div
                data-frosmo-elementid={this.props.id}
                ref={ ref => { this.frosmoMessage = ref; } }>

                    {element}
            </div>
        );
    }
}

FrosmoPlacement.propTypes = FrosmoPropTypes;
FrosmoPlacement.defaultProps = FrosmoComponentDefaultProps;

export default FrosmoPlacement;
