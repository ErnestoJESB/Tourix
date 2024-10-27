import axios from "axios";

const createAvailability = async (availability: any) => {
    try {
        const response = await axios.post("https://tourix-api.azurewebsites.net/DisponibilidadActividades", availability);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

export { createAvailability };