//Her importeres 'SENSOR_REDUCER_ACTION_TYPES' fra 'sensor.types' filen
import { SENSOR_REDUCER_ACTION_TYPES } from "./sensor.types";

//Her bliver reducerens begyndelsesstadie 'INITIAL_STATE' defineret med værdierne 'co' og 'voc'
const INITIAL_STATE = {
	values: {co:0,voc:0},
};

//'sensorReducer' funktionen defineres. Den tager de to argumenter 'state' og 'action'
export const sensorReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	//Der bruges en switch case til at håndtere forskellige typer af handlinger
	switch (type) {
		case SENSOR_REDUCER_ACTION_TYPES.SET_VALUES:
			//Her retuneres et nyt objekt hvor 'values' er erstattet af 'payload'
			return { ...state, values: payload };

		
		default:
            return state;
	}
};