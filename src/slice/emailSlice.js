import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import emailService from '../services/emailService';

const initialState = {
    data: [],
    bodyData: [],
}

// get list of emails
export const emailList = createAsyncThunk('/?page=', async (page) => {
    try {
        return await emailService.emailList(page);
    } catch (error) {
        if (error.response) {
            console.log(error)
            console.log(error.response)
        }
    }
})

// get body of email
export const emailBody = createAsyncThunk('/?id=', async (id) => {
    try {
        return await emailService.emailBody(id);
    } catch (error) {
        if (error.response) {
            console.log(error)
            console.log(error.response)
        }
    }
})

export const emailSlice = createSlice({
    name: 'emailList',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(emailList.pending, (state) => {
                state.data = []
            })
            .addCase(emailList.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(emailList.rejected, (state, action) => {
                state.data = []
            })
            .addCase(emailBody.pending, (state) => {
                state.bodyData = []
            })
            .addCase(emailBody.fulfilled, (state, action) => {
                state.bodyData = action.payload
            })
            .addCase(emailBody.rejected, (state, action) => {
                state.bodyData = []
            })
    }
})

export const { reset } = emailSlice.actions
export const dataValue = (state) => state.emails.data;
export const bodyDataValue = (state) => state.emails.bodyData;

export default emailSlice.reducer
