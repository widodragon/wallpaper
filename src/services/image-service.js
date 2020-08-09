import { pixabay_api } from '../assets/data';
import axios from 'axios';

export async function getImage(query) {
    try {
        const data = await axios.get(pixabay_api + `&q=${query}&image_type=photo`);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}