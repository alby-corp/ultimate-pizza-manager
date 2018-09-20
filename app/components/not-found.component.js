import template from '../views/not-found.html';

import {Span} from '../model';
import {BaseComponent} from './base.component'

export const NotFoundComponent = (function () {

    return class extends BaseComponent {

        constructor() {
            super(template);
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
