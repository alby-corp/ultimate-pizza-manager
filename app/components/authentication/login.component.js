export const Login = (function(){

    const embellish= (ul) => {
        ul.setAttribute('class', 'navbar-nav ml-auto');

        for (let li of ul.getElementsByTagName('li')) {

            li.setAttribute('class', 'nav-item');
            li.getElementsByTagName('span')[0].setAttribute('class', 'nav-link');
        }
    };

    return (service) => class extends HTMLElement {
        constructor() {

            // Always call super first in constructor
            super();

            const shadow = this.attachShadow({mode: 'open'});
            const wrapper = document.createElement('div');

            const ul = document.createElement('ul');

            shadow.appendChild(wrapper);

            if (service.user) {

                const l1 = document.createElement('li');
                const l2 = document.createElement('li');

                const user = document.createElement('span');
                user.textContent = service.user.profile.name;

                const signout = document.createElement('span');
                signout.textContent = "SignOut";
                signout.addEventListener("click", service.signout);

                l1.appendChild(user);
                l2.appendChild(signout);

                ul.appendChild(l1);
                ul.appendChild(l2);

            } else {

                const l1 = document.createElement('li');

                const signin = document.createElement('span');
                signin.textContent = "SignIn";
                signin.addEventListener("click", service.signin);

                l1.appendChild(signin);
                ul.appendChild(l1);
            }

            wrapper.appendChild(ul);

            embellish(ul);
        }
    };
})();