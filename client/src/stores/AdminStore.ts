import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAdminLoggedIn: false,
  },
  reducers: {
    setAdminLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isAdminLoggedIn = action.payload
    },
  },
})

export const { setAdminLoggedIn } = adminSlice.actions
export default adminSlice.reducer