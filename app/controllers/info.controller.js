const InfoController = (function () {

    const privateProps = new WeakMap();

    class InfoController extends BaseController{

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
            let administrators;

            try {
                administrators = await this.responseHandler(privateProps.get(this).service.getAdministrators);
            } catch {
                return;
            }


            const adminList = $('#admin-list');
            new List(adminList, administrators.map(admin => new AdminListItem(admin))).populate();

            return this;
        }
    }

    return InfoController;

})();
