const NotFoundController = (function () {

    const privateProps = new WeakMap();

    class NotFoundController {

        constructor(service, alertService) {

            privateProps.set(this, {
                service: service,
                alertService: alertService
            });
        }

        static get view() {
            return 'not-found.html';
        }

        async execute() {
            let subject;
            try {
                subject = `[${window.history.state['url']}]`;
            } catch {
                subject = 'requested page';
            }

            const messageSpan = $('#not-found-message');

            new Span(messageSpan, `The ${subject} was not found on this server!`).populate()
        }
    }

    return NotFoundController

})();
