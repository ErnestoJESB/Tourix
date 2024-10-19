import axios from 'axios';


const getActivities = async () => {
    try {
        const response = await axios.get('https://localhost:7029/Actividades');
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
};


export { getActivities };