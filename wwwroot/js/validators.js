ValidateKeyValuePairModel = (object) => {
    if(!object instanceof KeyValuePairModel){
        throw "Parameter is not a KeyValuePairModel object!";
    }
};

ValidateListModel = (object) => {
    if(!object instanceof ListModel){
        throw "Parameter is not a ListModel object!";
    }
};