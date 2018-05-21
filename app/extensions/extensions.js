export class Extensions{

    constructor() {
        // Array
        Array.prototype.exception = function (arr) {
            return this.filter((e) => arr.map(a => a.id).indexOf(e.id) === -1)
        };

    }
}

