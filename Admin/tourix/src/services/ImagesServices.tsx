import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const getImages = async (ID: number) => {
    try {
        const response = await axios.get(`${apiUrl}/ImagenesActividades/${ID}`);
        return response.data.result;
    }
    catch (error) {
        console.error(error);
    }
}

const createImage = async (Image: any) => {
    try {
        const response = await axios.post(`${apiUrl}/ImagenesActividades`, Image);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export { getImages, createImage };