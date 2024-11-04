import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const getActivities = async (id:number) => {
    try {
        const response = await axios.get(`${apiUrl}/Actividades/Agencia/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
};

const createActivity = async (activity: any) => {
    try {
        const response = await axios.post(`${apiUrl}/Actividades`, activity);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const deleteActivty = async (id: number) => {
    try {
        const response = await axios.delete(`${apiUrl}/Actividades/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export { getActivities, createActivity, deleteActivty };