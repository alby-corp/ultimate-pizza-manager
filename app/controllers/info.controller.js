const InfoController = (function () {

    const privateProps = new WeakMap();

    class InfoController {

        static get template(){
            return 'info.html';
        }

        constructor(services) {

            privateProps.set(this, {
                service: services[0],
                alertService: services[1]
            });
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
