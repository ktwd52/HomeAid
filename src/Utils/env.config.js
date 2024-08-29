const ENVConfig = {
  API_ServerURL:
    import.meta.env.VITE_API_SERVER_URL ||
    "https://homeaid-app-api.onrender.com", // live web API: https://homeaid-app-api.onrender.com or .env: import.meta.env.VITE_API_SERVER_URL
};
export default ENVConfig;
