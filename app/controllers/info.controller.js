const InfoController = (function () {

    const privateProps = new WeakMap();

    class InfoController {

        constructor(service, view, outlet, alertService) {

            privateProps.set(this, {
                service: service,
                alertService: alertService
            });
        }

        static get view(){
            return 'info.html';
        }

        async execute() {
            let administrators;

            try {
                administrators = await privateProps.get(this).service.getAdministrators();
            } catch (error) {
                privateProps.get(this).alertService.error(`${error.status}: ${error.statusText}`);
                return;
            }


            const adminList = $('#admin-list');
            new List(adminList, administrators.map(admin => new AdminListItem(admin))).populate();

            return this;
        }
    }

    return InfoController;

})();
