import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const getReservations = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/Reservaciones/Agencia/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

export { getReservations };