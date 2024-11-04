import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const createAvailability = async (availability: any) => {
    try {
        const response = await axios.post(`${apiUrl}/DisponibilidadActividades`, availability);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

export { createAvailability };