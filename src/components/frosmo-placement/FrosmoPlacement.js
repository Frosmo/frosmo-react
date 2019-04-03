/* global frosmo */
/* eslint-disable no-nested-ternary */
import React from 'react';
import assign from 'object-assign';
import PropTypes from 'prop-types';

import { pick } from '../../utils';

// props passed child component 
const pickState = ["status", "component", "loadComponent", "errorComponent", "message", "positionData"];

const STATUS_LOADING = 'loading';
const STATUS_SUCCESS = 'success';
const STATUS_ERROR = 'error';
const STATUS_NOTFOUND = 'notfound';
const DOM_EVENT_FROSMO_SPA_READY = 'frosmo.spa.ready'

const ChildComponentPropTypes = {
    children: PropTypes.node,
    component: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.elementType,
    ]),
    status: PropTypes.oneOf([
      STATUS_LOADING,
      STATUS_SUCCESS,
      STATUS_NOTFOUND,
      STATUS_ERROR,
    ]),
    loadComponent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.elementType,
    ]),
    errorComponent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.elementType,
    ]),
    message: PropTypes.shape({
      template: PropTypes.shape({
        defaults: PropTypes.any,
      }),
    }),
    positionData: PropTypes.shape({
      message: PropTypes.object,
      rules: PropTypes.array,
    }),
  };

const ChildComponentDefaultProps = {
    children: null,
    component: null,
    status: '',
    loadComponent: null,
    errorComponent: null,
    message: undefined,
    positionData: undefined,
};


/**
 * Custom React component provided by Frosmo (Joona Ojapalo)
 */
class ChildComponent extends React.Component {
    render () {
        const {
            children,
            status,
            component,
            loadComponent,
            errorComponent,
            message,
            positionData,
        } = this.props;

        const buildLoadElement = loadComponent =>
            loadComponent
                ? React.createElement(loadComponent)
                : null;

        switch (status) {
            case STATUS_NOTFOUND:
            case STATUS_LOADING:
                return buildLoadElement(loadComponent);

            case STATUS_SUCCESS:
                const templateDefaults = message.template
                    ? JSON.parse(message.template.defaults)
                    : {};

                // build props for modification component
                const messageProps = {
                    ...templateDefaults,
                    frosmoMessage: message,
                    frosmoPositionData: positionData,
                };

                // set templateDefaults as props
                const hasChildren = children && React.Children.count(children) > 0;

                const outputComponent = component
                     ? React.createElement(component, messageProps)
                     : hasChildren
                        ? React.Children.map(children, child => {
                            const props = assign({}, child.props, messageProps);
                            return React.createElement(child.type, props);
                        })
                        : null;

                // display tracking
                if (outputComponent) {
                    const mi = positionData.getMessageInstance();
                    mi.setDisplayed();
                }

                // show loadComponent as fallback
                if (!outputComponent) {
                    return buildLoadElement(loadComponent);
                }

                return outputComponent;

            case STATUS_ERROR:
                return errorComponent
                    ? React.createElement(errorComponent)
                    : null;

            default:
                console.error('[FrosmoPlacement] :: invalid status', status);
                return null;
        }
    }
}

ChildComponent.propTypes = ChildComponentPropTypes;
ChildComponent.defaultProps = ChildComponentDefaultProps;

export default class FrosmoPlacement extends React.Component {
    constructor(props) {
        super(props);

        // bind to class
        this.onFrosmoSpaReady.bind(this)

        this.state = {
            status: STATUS_LOADING,
            message: null,
            positionData: null,
            fetchPromise: null,
        };

        if (!props.id) {
            throw new Error('FrosmoPlacement: "id" property missing.', props);
        }
    }

    onFrosmoSpaReady() {
        window.removeEventListener(DOM_EVENT_FROSMO_SPA_READY, this.onFrosmoSpaReady);

        const id = this.props.id;

        // start loading
        const fetchPromise = frosmo.spa.requestBySelector(id)
            .then(messageHandle => {
                // no display from server-side
                if (!messageHandle.positionData.message) {
                    this.setState({
                        fetchPromise: null,
                        status: STATUS_NOTFOUND,
                    });
                }

                this.setState({
                    fetchPromise: null,
                    status: STATUS_SUCCESS,
                    message: messageHandle.positionData.message,
                    positionData: messageHandle.positionData,
                    clearMessage: messageHandle.clear,
                });
            })
            .catch(error => {
                this.setState({
                    status: STATUS_ERROR
                });
                frosmo.spa.log.error(error, 'spa.react.placement');
            });

        this.setState({fetchPromise});
    }

    componentWillUnmount() {
        // clear plugging, if exist
        window.removeEventListener(DOM_EVENT_FROSMO_SPA_READY, this.onFrosmoSpaReady);

        // cancel ongoing fetch request
        if (this.state.fetchPromise) {
            this.state.fetchPromise.cancel();
        }

        // clear message if was loaded
        if (this.state.clearMessage) {
            this.state.clearMessage();
        }
    }

    componentDidMount() {
        // start plugging
        if (window.frosmo && window.frosmo.spa) {
            this.onFrosmoSpaReady();
        } else {
            window.addEventListener(DOM_EVENT_FROSMO_SPA_READY, this.onFrosmoSpaReady);
        }
    }

    componentDidUpdate() {
        if (this.state.status === STATUS_SUCCESS) {
            const el = this.refs.frosmomessage;
            const instance = this.state.positionData.getMessageInstance();

            // TODO: proper error handling model...
            if (!el || !instance) {
                return;
            }

            // start tracking the message
            instance.setTrackableElements(el);
            instance.startTracking();
        }
    }

    render() {
        // pass state as immutable props
        const stateClone = pick(this.state, pickState);
        const element = <ChildComponent {...this.props} {...stateClone}/>;

        // wrap in fragment
        if (this.props.useFragment) {
            return <React.Fragment>{element}</React.Fragment>;
        }

        // wrap inside a trackable div element
        return (
            <div data-frosmo-elementid={this.props.id} ref="frosmomessage">{element}</div>
        );
    }
}
