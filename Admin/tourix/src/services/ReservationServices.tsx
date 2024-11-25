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

const updateReservation = async (id: number, data: any) => {
    try {
        const response = await axios.put(`${apiUrl}/Reservaciones/${id}`, data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.result;
    }
    catch (error) {
        console.error(error);
    }
}

const deleteReservation = async (id: number) => {
    try {
        const response = await axios.delete(`${apiUrl}/Reservaciones/${id}`);
        return response.data.result;
    }
    catch (error) {
        console.error(error);
    }
}

export { getReservations, updateReservation, deleteReservation };