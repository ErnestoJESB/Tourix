import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/Agencias/login`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const register = async (nombreAgencia: string, email: string, password: string, telefono: string, direccion: string, descripcion: string) => {
    try {
        const response = await axios.post(`${apiUrl}/Agencias/register`, { nombreAgencia, email, password, telefono, direccion, descripcion });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { login, register }