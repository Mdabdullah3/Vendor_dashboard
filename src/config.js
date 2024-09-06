const PRODUCTION = true;
const PRODUCTION_API = "https://baburhaatbd.com/api"
const DEVELOPMENT_API = "http://localhost:5000/api";
export const API_URL = PRODUCTION ? PRODUCTION_API : DEVELOPMENT_API;
export const SERVER = PRODUCTION ? "https://baburhaatbd.com" : "http://localhost:5000"