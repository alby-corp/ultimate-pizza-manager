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

        async populate() {
            const url = window.history.state['url'];

            const messageSpan = $('#not-found-message');

            new Span(messageSpan, `The ${url} was not found on this server!`).populate()
        }
    }

    return NotFoundController

})();
