import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "",
  selected:{
    isSelected:false,
    selectedId:null,
  }
};

export const slaveSlice = createSlice({
  name: 'slave',
  initialState,
  reducers: {
    open: (state,msg) => {
      if(msg.payload==="close"){
        state.value = ""
      }
      else{
        state.value = "flex"
      }
    },
    select: (state,id) => {
      if(id.payload==="close"){
      state.selected.isSelected = false;
      }
      else{
        state.selected.isSelected = true;
      }
      state.selected.selectedId = id.payload;
    }
  }
});

export const { open, select } = slaveSlice.actions;
export const styleValue = (state) => state.slave.value;
export const selectedValue = (state) => state.slave.selected.isSelected;
export const selectedIdValue = (state) => state.slave.selected.selectedId;

export default slaveSlice.reducer;
