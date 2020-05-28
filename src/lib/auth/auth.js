const API_URL = 'http://gisteco.epsgrau.pe:3030';
const defReqOptions = { method: 'POST', credentials: 'include' };

function Auth() { }

Auth.prototype.login = function (user, password) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `username=${user}&password=${password}`;
    const request = new Request(`${API_URL}/login`, {
        ...defReqOptions,
        headers,
        body
    });
    return fetch(request)
        .then(response => {
            if (response.status === 401) throw new Error('Usuario o clave incorrecta');
            return response.json();
        });
};
Auth.prototype.logout = function () {
    const request = new Request(`${API_URL}/logout`, defReqOptions);
    return fetch(request)
        .then(response => {
            if (response.status === 500) throw new Error(response.statusText);
            return true;
        })
};
Auth.prototype.isAuthenticated = function () {

    const request = new Request(`${API_URL}/isAuthenticated`, defReqOptions);
    return fetch(request)
        .then(response => {
            if (response.status === 401) return false;
            return true;
        });
};

export default new Auth();