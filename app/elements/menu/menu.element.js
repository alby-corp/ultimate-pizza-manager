import menu from './menu.template.html';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const MenuElement = (function () {

    const getStyle = (selector) => selector ? 'inline' : 'none';

    return authService => class extends HTMLElement {
        constructor() {

            super();
            this.innerHTML = menu;

            const orders = document.getElementById('master-menu-week-orders');
            authService.user.then((user) => orders.style.display = getStyle(user));
        }
    };
})();