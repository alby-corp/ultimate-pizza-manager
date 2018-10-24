export class NamespaceService {

    static register(namespace, name, func) {

        if (!window.AlbyJs) {
            window.AlbyJs = {};
        }

        if (!window.AlbyJs[namespace]) {
            window.AlbyJs[namespace] = {};
        }

        window.AlbyJs[namespace][name] = func;
    }
}