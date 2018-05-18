import {Span} from '../model';

export const NotFoundController = (function () {

    const privateProps = new WeakMap();

    return class {

        static get template() {
            return 'not-found.html';
        }

        async execute() {
            let subject;
            try {
                subject = `[${window.history.state['url']}]`;
            } catch (error) {
                subject = 'requested page';
            }

            const messageSpan = $('#not-found-message');

            new Span(messageSpan, `The ${subject} was not found on this server!`).populate()
        }
    };

})();
