import config from 'config';
import { authHeader } from '../_helpers';


export const userService = {
    login,
    logout,
    register,
    confirm,
    getAll,
    getById,
    update,
    delete: _delete,
    create_bill,
    //get_bill,
    getAll_bill,
    create_transaction,
    get_transaction,
    fill_balance
};


function fill_balance(id, amount) {
    let user = JSON.parse(localStorage.getItem('user'));

    const body_string =
        '{'+
        '"accountID":'+id+',' +
        '"amount":"'+amount+'"}'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': user.token },

        body:body_string
        //body: JSON.stringify({ username, password, code })
    };

    return fetch(`${config.mainUrl}/v1/accounts/${id}/fill-balance`, requestOptions)
        .then(handleResponse)
   //     .then(account => {
   //         //    // store user details and jwt token in local storage to keep user logged in between page refreshes
   //         //localStorage.setItem('user', JSON.stringify(user));
   //         return account;
   //     })
        ;
}



function create_bill(currency, limit, name) {
    let user = JSON.parse(localStorage.getItem('user'));

    const body_string =
        '{'+
        '"currency":'+currency+',' +
        '"limit":"'+limit+'",' +
        '"name":"'+name+'"}'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': user.token },

        body:body_string
        //body: JSON.stringify({ username, password, code })
    };

    return fetch(`${config.mainUrl}/v1/accounts/create`, requestOptions)
        .then(handleResponse)
        .then(account => {
            //    // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));
            return account;
        })
        ;
}

function get_bill(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        //body: JSON.stringify({ username, password, code })
    };

    return fetch(`${config.mainUrl}/v1/accounts/${id}`, requestOptions)
        .then(handleResponse)
        .then(account => {
            //    // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));
            return account;
        })
        ;
}


function getAll_bill() {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': user.token }

        //body: JSON.stringify({ username, password, code })
    };

    return fetch(`${config.mainUrl}/v1/accounts`, requestOptions)
         .then(handleResponse)
        .catch(error => {
            //Here is still promise
            console.log(error);
            error.json().then((body) => {
                //Here is already the payload from API
                console.log(body);
            });
        })
     //   .then(account => {
            //console.log('111'+(JSON.stringify(account)))
            //    // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));
     //       return account;
     //   })
        ;
}


function create_transaction(id, payee, amount) {
    let user = JSON.parse(localStorage.getItem('user'));

    const body_string =
        '{'+
        '"accountID":"'+id+'",' +
        '"payee":"'+payee+'",' +
        '"amount":"'+amount+'"}'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': user.token },
        body:body_string
        //body: JSON.stringify({ username, password, code })
    };

    return fetch(`${config.mainUrl}/v1/transactions/create`, requestOptions)
        .then(handleResponse)
        .then(transaction => {
            //    // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));
            return transaction;
        })
        ;
}

function get_transaction(id) {
    let user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': user.token }
        //body: JSON.stringify({ username, password, code })
    };

    return fetch(`${config.mainUrl}/v1/${id}/transactions`, requestOptions)
        .then(handleResponse)
        .then(account => {
            //    // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));
            return account;
        })
        ;
}

function login(username, password) {

    const body_string =
        '{'+
        '"email":"'+username+'",' +
        '"password":"'+password+'"}'


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ username, password })
        body:body_string
    };

    return fetch(`${config.apiUrl}/v1/auth/sign-in`, requestOptions)
        .then(handleResponse)
        .then(user => {
  //          console.log(user)
        //    // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));
        }
   //     ,
   //         error => {
   //             console.log(error)
   //         }
            )
  //      .catch(err => {
  //          return err
 //           console.log(err);
 //       })
        ;
}

function confirm(username, password, code) {
    const body_string =
        '{'+
        '"email":"'+username+'",' +
        '"password":"'+password+'",' +
        '"code":"'+code+'"}'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:body_string
        //body: JSON.stringify({ username, password, code })
    };

    return fetch(`${config.apiUrl}/v1/auth/submit-code`, requestOptions)
        .then(handleResponse)
        .then(user => {
            //    // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            //return user;
        })
        ;
}


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    let user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': user.token }
    };



    return fetch(`${config.apiUrl}/v1/passport`, requestOptions).then(handleResponse)
        .then(user => {
            return user;
        })
        ;
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {

    const body_string =
        '{'+
        '"email":"'+user.email+'",' +
        '"password":"'+user.password+'",'+
        '"passport":{'+
            '"series":"'+user.series+'",'+
            '"number":"'+user.number+'",'+
            '"firstName":"'+user.firstName+'",'+
            '"middleName":"'+user.middleName+'",'+
            '"lastName":"'+user.lastName+'",'+
            '"issuedBy":"'+user.issuedBy+'",'+
            '"issuedAt":"'+user.issuedAt+'T00:00:00.999999999Z'+'",'+
            '"address":"'+user.address+'",'+
            '"birthplace":"'+user.birthplace+'",'+
            '"birthdate":"'+user.birthdate+'T00:00:00.999999999Z'+'"'+'}}';


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(user)
        body: body_string
    };


    return fetch(`${config.apiUrl}/v1/auth/sign-up`, requestOptions).then(handleResponse);
}


function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            if (response.status === 404) {
                // auto logout if 401 response returned from api
                const obj = JSON.parse(text)

                //console.log(text)
                //location.reload(true);
            }
            //console.log(data.code+" "+response.statusText)
            const error = (data && data.message) || response.statusText;
            //console.log(error)

            return Promise.reject(error);
        }

        return data;
    });
}