import axios from "axios";

const getImages = async (ID: number) => {
    try {
        const response = await axios.get(`https://tourix-api.azurewebsites.net/ImagenesActividades/${ID}`);
        return response.data.result;
    }
    catch (error) {
        console.error(error);
    }
}

const createImage = async (Image: any) => {
    try {
        const response = await axios.post("https://tourix-api.azurewebsites.net/ImagenesActividades", { Image });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export { getImages, createImage };