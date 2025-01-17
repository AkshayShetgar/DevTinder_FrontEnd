export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "http://13.232.97.114/api";

import io from "socket.io-client";
export const createSocketConnection = () => {
    return io(BASE_URL);
}

