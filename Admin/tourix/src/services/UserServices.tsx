import axios from "axios";

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('https://localhost:7029/Agencias/login', { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const register = async(nombre: string, correo: string, password:string, telefono:string, rol_id: number) => {
    try{
        const response = await axios.post('https://localhost:7029/Usuarios', {nombre, correo, password, telefono, rol_id});
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export { login, register }