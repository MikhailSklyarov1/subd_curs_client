import { AppDispatch } from "../store";
import axios from "axios";
import { filterSlice } from "./FilterSlice";



export const fetchData = (num: number, minVary: number, maxVary: number, emotions: string[]) => async (dispatch: AppDispatch) => {
    try {
        const response  = await axios.post(`http://localhost:5000/api/records/vary_emo?num=${num}&min_count_vary_emo=${minVary}&max_count_vary_emo=${maxVary}`, {emotions});
        //console.log('num: ', num, ' minVary: ', minVary, ' maxVary: ', maxVary, ' emotions: ', emotions)
        dispatch(filterSlice.actions.getData(response.data));
    } catch (e) {
        console.log('Error!!!');
    }
}