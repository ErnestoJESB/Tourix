import axios from 'axios';


const getActivities = async (id:number) => {
    try {
        const response = await axios.get(`https://tourix-api.azurewebsites.net/Actividades/Agencia/${id}`);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
};

const createActivity = async (activity: any) => {
    try {
        const response = await axios.post("https://tourix-api.azurewebsites.net/Actividades", activity);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const deleteActivty = async (id: number) => {
    try {
        const response = await axios.delete(`https://tourix-api.azurewebsites.net/Actividades/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export { getActivities, createActivity, deleteActivty };