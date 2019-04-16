import React, { Component } from 'react';
import ModificationService from '../../services/ModificationService';


export default function withModification(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

            if (!props.id) {
                console && console.warn && console.warn('FrosmoPlacement: "id" property missing.', props);
            }

            this.state = {
                isReady: false,
                modificationContext: null,
            };

            this._modificationContextService = new ModificationService({
                id: props.id,
                onComplete: (modificationContext) => {
                    this.setState({
                        modificationContext,
                        isReady: true,
                    });
                }
            });
        }

        componentWillUnmount() {
            this._modificationContextService.cancel();
        }

        componentDidMount() {
            this._modificationContextService.fetch();
        }

        render() {
            if (!this.state.isReady) {
                return this.props.defaultComponent
                    ? React.createElement(this.props.defaultComponent, this.props)
                    : null;
            }

            return <WrappedComponent
                modificationContext={this.state.modificationContext}
                {...this.props }
            />
        }
    }
}
