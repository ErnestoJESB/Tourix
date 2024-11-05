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

const getAvailabilityById = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/DisponibilidadActividades/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

export { createAvailability, getAvailabilityById };