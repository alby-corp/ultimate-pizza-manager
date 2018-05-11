const NotFoundController = (function () {

    const privateProps = new WeakMap();

    class NotFoundController extends BaseController {

        constructor(service, view, outlet, alertService) {
            super(view, outlet, alertService);

            privateProps.set(this, {
                service: service,
                view: view,
                outlet: outlet,
                alertService: alertService
            });
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
