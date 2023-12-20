import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilter } from "../../interfaces/IFilter";
import { IData } from "../../interfaces/IData";

interface FilterState {
    data: IData[];
    filter: IFilter;
    // isLoading: boolean;
    error: string;
}


const initialState: FilterState = {
    data: [{_id: '', text: '', emotion_id: ''}],
    filter: {minVary: 1, maxVary: 4, num: 10 , emotions: ['']},
    // isLoading: false,
    error: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setParams(state, action: PayloadAction<IFilter>) {
            state.filter = action.payload;
        },
        setNum(state, action: PayloadAction<number>) {
            state.filter.num = action.payload;
        },
        setRange(state, action: PayloadAction<number[]>) {
            state.filter.maxVary = action.payload[1];
            state.filter.minVary = action.payload[0];
        },
        setEmotions(state, action: PayloadAction<string[]>) {
            state.filter.emotions = action.payload;
        },
        getData(state, action: PayloadAction<IData[]>) {
            // state.isLoading = true;
            state.data = action.payload;
        }
    }
})

export default filterSlice.reducer;
export const { setParams, setNum, setRange, setEmotions } = filterSlice.actions;