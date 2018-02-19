const url = window.location.href;

get = uri => $.get(`${url}${uri}`);

getById = (uri, id) => $.get(`${url}${uri}?id=${id}`);
