import { io } from 'socket.io-client';


const URL = import.meta.env.NODE_ENV === 'production' ? undefined : `http://localhost:`+2024;
console.log(URL);
socket = io(URL);
socket.on("message",(data)=>{
    console.log(data.event);
});
export default socket;