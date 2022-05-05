import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    confirm,
    register,
    getAll,
    delete: _delete,
    create_bill,
    //get_bill,
    getAll_bill,
    create_transaction,
    get_transaction,
    fill_balance
};

function fill_balance(id , amount) {
    return (dispatch) => {
        dispatch(request({ id , amount }));

        userService.fill_balance(id , amount)
            .then(
                user => {
                    dispatch(success(user));
                    //history.push('/confirm');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.FILL_BALANCE_REQUEST, user } }
    function success(user) { return { type: userConstants.FILL_BALANCE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FILL_BALANCE_FAILURE, error } }
}


function create_bill(currency , limit, name) {
    return (dispatch) => {
        dispatch(request({ currency , limit, name }));

        userService.create_bill(currency , limit, name)
            .then(
                user => {
                    dispatch(success(user));
                    //history.push('/confirm');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.CREATE_BILL_REQUEST, user } }
    function success(user) { return { type: userConstants.CREATE_BILL_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CREATE_BILL_FAILURE, error } }
}

function get_bill(id) {
    return dispatch => {
        dispatch(request({ id }));

        userService.get_bill(id)
            .then(
                user => {
                    dispatch(success(user));
                    //history.push('/confirm');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.GET_BILL_REQUEST, user } }
    function success(user) { return { type: userConstants.GET_BILL_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_BILL_FAILURE, error } }
}

function getAll_bill() {
    return dispatch => {
        dispatch(request());

        return userService.getAll_bill()
            .then(
                getallbill => {
                    dispatch(success(getallbill));
                    console.log('222'+JSON.stringify(getallbill))
                    //return 'kek';
                    //history.push('/confirm');
                    return getallbill;
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_BILL_REQUEST } }
    function success(getallbill) { return { type: userConstants.GETALL_BILL_SUCCESS, getallbill } }
    function failure(error) { return { type: userConstants.GETALL_BILL_FAILURE, error } }
}

function create_transaction(id, payee, amount) {
    return dispatch => {
        dispatch(request({  }));

        userService.create_transaction(id, payee, amount)
            .then(
                transaction => {
                    dispatch(success(transaction));
                    //history.push('/confirm');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.CREATE_TRANSACTION_REQUEST, user } }
    function success(transaction) { return { type: userConstants.CREATE_TRANSACTION_SUCCESS, transaction } }
    function failure(error) { return { type: userConstants.CREATE_TRANSACTION_FAILURE, error } }
}

function get_transaction(id) {
    return dispatch => {
        dispatch(request({  }));

        return userService.get_transaction(id)
            .then(
                transactions => {
                    dispatch(success(transactions));
                    return transactions
                    //history.push('/confirm');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_TRANSACTION_REQUEST } }
    function success(transactions) { return { type: userConstants.GET_TRANSACTION_SUCCESS, transactions } }
    function failure(error) { return { type: userConstants.GET_TRANSACTION_FAILURE, error } }
}





function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        return userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));

                    console.log(user)
                    return user
                },
                error => {
                    console.log(error)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    return error
                }
            ).catch(error => {
                //console.log(error)
                dispatch(failure(error.toString()));
       //         dispatch(alertActions.error(error.toString()));
                return error
            })
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function confirm(username, password, code) {
    return dispatch => {
        dispatch(request({ username }));

        return userService.confirm(username, password, code)
            .then(
                user => {
                    console.log("123"+user)

                    dispatch(success(user));
                    history.push('/');
                    return user
                },
                error => {
                    console.log("321"+error)

                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    return error
                }
            );
        //history.push('/');
    };

    function request(user) { return { type: userConstants.CONFIRM_REQUEST, user } }
    function success(user) { return { type: userConstants.CONFIRM_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CONFIRM_FAILURE, error } }
}


function logout() {
    userService.logout();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
            ;
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

       return userService.getAll()
            .then(
                users => {dispatch(success(users)); return users},
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}