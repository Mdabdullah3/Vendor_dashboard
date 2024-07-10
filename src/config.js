const PRODUCTION = false;
const PRODUCTION_API = "http://103.148.15.24:5000/api"
const DEVELOPMENT_API = "http://localhost:5000/api";
export const API_URL = PRODUCTION ? PRODUCTION_API : DEVELOPMENT_API;
export const SERVER = PRODUCTION ? "http://103.148.15.24:5000" : "http://localhost:5000"