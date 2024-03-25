import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { ItemType } from "../../types/types";
import { items } from "../../mock-api/mockServer";
import { RootState } from "..";

export const selectItems = (state: RootState) => state.item.items;

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        items: items
    },
    reducers: {
        remoteItembyId: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        createItem: (state, action) => {
            state.items.unshift({
                id: (state.items.length + 2).toString(),
                name: action.payload.name,
                description: action.payload.description,
                favor: action.payload.favor,
                avatar: action.payload.avatar
            });
        },
        editItem: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, favor: !action.payload.favor }
                }
                return item;
            })
        },
        removeSelectedItems: (state, action) => {
            action.payload.map((id: string) => {
                state.items = state.items.filter(item => item.id !== id)
            })
        }
    },
    extraReducers: (builder) => { }
});

export const { remoteItembyId, createItem, editItem, removeSelectedItems } = itemSlice.actions;

export default itemSlice.reducer;