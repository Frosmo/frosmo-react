import React, { Component } from 'react';
import ModificationService from '../../services/ModificationService';


export default function withMessage(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

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
                return null;
            }

            return <WrappedComponent
                modificationContext={this.state.modificationContext}
                {...this.props }
            />
        }
    }
}
