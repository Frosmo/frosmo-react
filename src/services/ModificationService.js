import logger from "../utils/logger";

const DOM_EVENT_FROSMO_SPA_READY = 'frosmo.spa.ready';


class ModificationService {
    constructor({ id, onComplete }) {
        const noop = () => {};

        this._id = id;
        this._func = onComplete || noop;

        this._modificationContextHandle = null;
        this._fetchModifications = this._fetchModifications.bind(this);
    }

    fetch() {
        if (!window) {
            return;
        }

        if (window.frosmo && window.frosmo.spa) {
            this._fetchModifications();
        } else if (window.addEventListener) {
            window.addEventListener(DOM_EVENT_FROSMO_SPA_READY, this._fetchModifications);
        } else if (window.attachEvent) {
            window.attachEvent(DOM_EVENT_FROSMO_SPA_READY, this._fetchModifications);
        } else {
            logger.error('Event cannot be attached');
        }
    }

    _fetchModifications() {
        this._modificationContextHandle = window.frosmo.spa.requestBySelector(this._id);
        this._modificationContextHandle
            .then(context => this._func(context))
            .catch(error => {
                logger.error(error);
                this._func(null);
            });
    }

    cancel() {
        if (this._modificationContextHandle) {
            this._modificationContextHandle.cancel();
            this._modificationContextHandle = null;
        }

        if (window.removeEventListener) {
            window.removeEventListener(
                DOM_EVENT_FROSMO_SPA_READY,
                this._fetchModifications
            );
        } else if (window.detachEvent) {
            window.detachEvent(
                DOM_EVENT_FROSMO_SPA_READY,
                this._fetchModifications
            );
        } else {
            logger.error('Event cannot be detached');
        }

        this._func = null;
    }
}

export default ModificationService;
