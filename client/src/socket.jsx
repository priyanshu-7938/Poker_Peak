import { io } from 'socket.io-client';


const URL = import.meta.env.NODE_ENV === 'production' ? undefined : `http://localhost:`+import.meta.env.PORT;
console.log(URL);
export const socket = io(URL);