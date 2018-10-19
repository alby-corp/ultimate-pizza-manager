import login from './login.template.html';

export const LoginElement = (function () {

    const getStyle = (flag) => flag ? 'inline' : 'none';

    return authService => class extends HTMLElement {
        constructor() {

            super();
            this.innerHTML = login;

            authService.user.then((user) => {
                const userElement = document.getElementById('login-user');
                userElement.getElementsByTagName('span')[0].textContent = user ? user.name : "";

                const signoutElement = document.getElementById('login-signout');
                signoutElement.addEventListener('click', authService.signout);

                const signinElement = document.getElementById('login-signin');
                signinElement.addEventListener('click', authService.signin);

                signoutElement.style.display = userElement.style.display = getStyle(user);
                signinElement.style.display = getStyle(!user);
            });
        };
    }
})();