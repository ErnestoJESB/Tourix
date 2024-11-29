import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const getActivityPop = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/Dashboard/ActividadMasReservada/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

const getIngresosDia = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/Dashboard/IngresosPorDia/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

const getBestClient = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/Dashboard/MejorCliente/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

const getVentasxDia = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/Dashboard/VentasPorDia/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

const getTotalActivities = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/Dashboard/TotalActividades/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

const getTotalReservations = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/Dashboard/TotalReservaciones/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

const getTotalSales = async (id: number) => {
    try {
        const response = await axios.get(`${apiUrl}/Dashboard/TotalIngresos/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
}

export { getActivityPop, getIngresosDia, getBestClient, getVentasxDia, getTotalActivities, getTotalReservations, getTotalSales };