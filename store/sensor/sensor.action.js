import { SENSOR_REDUCER_ACTION_TYPES } from "./sensor.types";

//Denne funktion tager to argumenter og retunerer et objekt med de to argumenter.
export const createAction=(type,payload)=>({type,payload});

//Denne funktion tager kun et argument og kalder derefter 'createAction' med to argumenter. Denne funktion bruges til at opdatere værdierne fra sensoren.
export const setValues = (values) => createAction(SENSOR_REDUCER_ACTION_TYPES.SET_VALUES, values);