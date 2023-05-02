import { USER_REDUCER_ACTION_TYPES } from "./user.types";
export const createAction=(type,payload)=>({type,payload});
export const setCurrentUser = (user) => createAction(USER_REDUCER_ACTION_TYPES.SET_CURRENT_USER, user);

export const setAllUsers= (users)=> createAction(USER_REDUCER_ACTION_TYPES.SET_USERS,users);