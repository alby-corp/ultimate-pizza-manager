function KeyValuePairModel(key, value) {
    this.key = replaceWhiteSpaceWithUndescore(key);
    this.value = value;
}

function ListModel(value) {
    this.value = value;
}

