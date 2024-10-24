import axios from 'axios';


const getActivities = async () => {
    try {
        const response = await axios.get('https://tourix-api.azurewebsites.net/Actividades');
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
};


export { getActivities };