// Array
Array.prototype.exception = function(arr) {
    return this.filter((e) => arr.map(a => a.id).indexOf(e.id) === -1)
};

// Object
Object.prototype.getPropertyDescriptor = function (key) {
    return Object.getOwnPropertyDescriptor(this, key) || this.getPropertyDescriptor(Object.getPrototypeOf(obj), key)
};
