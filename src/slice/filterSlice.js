import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selected: {
    isSelected: false,
    selectedId: null,
  },
  read: [],
  readSaved: [],
  favorites: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    select: (state, id) => {
      state.selected.isSelected = true;
      state.selected.selectedId = id.payload;
    },
    read: (state, id) => {
      state.read.push(id.payload)
      localStorage.setItem("Read",JSON.stringify(state.read))
    },
    readSaved: (state, readIdArray) => {
      state.readSaved = readIdArray.payload
      localStorage.setItem("ReadSaved",JSON.stringify(state.readSaved))
    },
    favorites: (state, id) => {
      if (state.favorites.includes(id.payload)) {
        state.favorites.pop(id.payload)
        localStorage.setItem("Favorites",JSON.stringify(state.favorites))
      }
      else {
        state.favorites.push(id.payload)
        localStorage.setItem("Favorites",JSON.stringify(state.favorites))
      }
    }
  }
});

export const { select, read, readSaved, favorites } = filterSlice.actions;
export const selectedValue = (state) => state.filter.selected.isSelected;
export const selectedFilterId = (state) => state.filter.selected.selectedId;

export default filterSlice.reducer;
