const PRODUCTION = true;
const PRODUCTION_API = "http://baburhaatbd.com:5000/api"
const DEVELOPMENT_API = "http://localhost:5000/api";
export const API_URL = PRODUCTION ? PRODUCTION_API : DEVELOPMENT_API;
export const SERVER = PRODUCTION ? "http://baburhaatbd.com:5000" : "http://localhost:5000"