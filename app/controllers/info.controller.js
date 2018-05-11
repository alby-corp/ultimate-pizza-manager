const InfoController = (function () {

    const privateProps = new WeakMap();

    class InfoController extends BaseController{

        constructor(resourceService, view, outlet) {
            super(view, outlet);

            privateProps.set(this, {
                resourceService: resourceService,
                view: view,
                outlet: outlet
            });
        }

        async populate() {
            let administrators;

            try {
                administrators = await this.responseHandler(AlbyJs.ResourceService.getAdministrators);
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
