export const ModalService = (function () {
    const renderModal = function (title, body, buttons, name, style) {
        const renderedButtons = [];
        buttons.forEach(button => {
            renderedButtons.push(button.render());
        });

        return `    <div class="modal fade" id="${name}">
                        <div class="modal-dialog">
                            <div class="modal-content">
      
                                <!-- Modal Header -->
                                <div class="modal-header ${style}">
                                    <h4 class="modal-title">${title}</h4>
                                </div>
        
                                <!-- Modal body -->
                                <div class="modal-body">
                                    ${body}
                                </div>
        
                                <!-- Modal footer -->
                                <div class="modal-footer">
                                    ${renderedButtons.join('')}
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
        
                            </div>
                        </div>
                    </div>`;
    };

    const create = function (display, title, body, buttons, name, style) {
        display.html(
            renderModal(title, body, buttons, name, style)
        );
    };

    const open = function (name) {
        $(`#${name}`).modal('show');
    };

    const privateProps = new WeakMap();

    return class {
        constructor(display, name) {
            privateProps.set(this, {
                name: name
            });
        }

        success(body, buttons) {

            buttons.forEach(button => button.attrs.set('data-dismiss', 'modal'));
            create($('#alert-service'), 'Success', body, buttons, privateProps.get(this).name, 'alert alert-success');

            open(privateProps.get(this).name);
        }

        error(body) {

            create($(`#alert-service`), 'Error', body, [], privateProps.get(this).name, 'alert alert-danger');

            open(privateProps.get(this).name);
        }


        warning(body) {
            create($(`#alert-service`), 'Warning', body, [], privateProps.get(this).name, 'alert alert-warning');

            open(privateProps.get(this).name);
        }
    };

})();