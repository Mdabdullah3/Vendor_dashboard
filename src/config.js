const PRODUCTION = false;
const PRODUCTION_API = process.env.PRODUCTION
const DEVELOPMENT_API = process.env.DEVELOPMENT_API
export const API_URL = PRODUCTION ? PRODUCTION_API : DEVELOPMENT_API;
export const SERVER = PRODUCTION ? "http://103.148.15.24:5000" : "http://localhost:5000"