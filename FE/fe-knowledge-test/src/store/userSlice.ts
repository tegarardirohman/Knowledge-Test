// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Tipe state untuk data pengguna
interface UserState {
  email: string | null;
  gender: string | null;
  name: string | null;
}

// State awal
const initialState: UserState = {
  email: null,
  gender: null,
  name: null,
};

// Membuat slice untuk data pengguna
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action untuk menyimpan data pengguna
    setUser: (state, action: PayloadAction<{ email: string, gender: string, name: string }>) => {
      state.email = action.payload.email;
      state.gender = action.payload.gender;
      state.name = action.payload.name;
    },
  },
});

// Ekspor action dan reducer
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
