import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    selectFilter(state, action) {
      return action.payload
    }
  }
})

export const { selectFilter } = filterSlice.actions
export default filterSlice.reducer