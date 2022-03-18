import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { confirmation } from './confirmation.reducer';

import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  confirmation,
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;