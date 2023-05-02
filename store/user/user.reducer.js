import { USER_REDUCER_ACTION_TYPES } from "./user.types";


const INITIAL_STATE = {
	currentUser: {co:0,voc:0},
	allUsers:[],
	
};


export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_REDUCER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: payload };

		case USER_REDUCER_ACTION_TYPES.SET_USERS:
			return {...state,allUsers:[...payload]}	
		default:
            return state;
	}
};