import React from 'react';
import assign from 'object-assign';


const _createReactElement = component =>
    component
        ? React.createElement(component)
        : null;

const hasChildren = (children) => children && React.Children.count(children) > 0;
const buildMessageProps = (modificationContext) => {
    // Set templateDefaults as props
    const { params } = modificationContext;

    // Build props for modification component
    return {
        ...params,
        frosmoModificationContext: modificationContext,
    };
};

const createReactComponent = (component, children, messageProps) => {
    if (component) {
        return React.createElement(component, messageProps);
    } else if (hasChildren(children)) {
        return React.Children.map(children, child => {
            const childProps = assign({}, child.props, messageProps);
            return React.createElement(child.type, childProps);
        });
    } else {
        return null;
    }
};

/**
 * Custom React component provided by Frosmo (Joona Ojapalo)
 */
const _renderSuccess = (props) => {
    const {
        children,
        component,
        defaultComponent,
        modificationContext,
    } = props;

    const messageProps = buildMessageProps(modificationContext);
    const outputComponent = createReactComponent(component, children, messageProps);

    // Display tracking
    if (!outputComponent) {
        // Show defaultComponent
        return _createReactElement(defaultComponent);
    } else {
        modificationContext.setDisplayed();
        return outputComponent;
    }
};


export default function (props) {
    const {
        defaultComponent,
        modificationContext
    } = props;

    if (modificationContext !== null) {
        return _renderSuccess(props);
    }

    return _createReactElement(defaultComponent);
};
