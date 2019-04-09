import PropTypes from 'prop-types';

const ModificationContextPropTypes = {
    variation: PropTypes.number.isRequired,
    params: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    setDisplayed: PropTypes.func.isRequired,
    setClicked: PropTypes.func.isRequired,
    setTrueDisplayed: PropTypes.func.isRequired,
    setTrackableElements: PropTypes.func.isRequired,
    startTracking: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired
}

const FrosmoPropTypes = {
    children: PropTypes.node,
    component: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.elementType,
    ]),
    defaultComponent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.elementType,
    ]),

    modificationContext: PropTypes.exact(ModificationContextPropTypes),
};

export {
    FrosmoPropTypes,
}
