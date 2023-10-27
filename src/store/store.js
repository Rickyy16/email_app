import { configureStore } from '@reduxjs/toolkit';
import slaveReducer from '../slice/slaveSlice';
import emailListReducer from '../slice/emailSlice';
import filterReducer from '../slice/filterSlice';

export const store = configureStore({
    reducer: {
        slave: slaveReducer,
        emails: emailListReducer,
        filter: filterReducer
    }
});
