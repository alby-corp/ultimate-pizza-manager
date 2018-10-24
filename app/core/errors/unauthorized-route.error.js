export class UnauthorizedRouteError extends Error {
    constructor(callback) {
        super();

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedRouteError);
        }

        this._callback = callback;
    }

    get callback() {
        return this._callback;
    }
}
