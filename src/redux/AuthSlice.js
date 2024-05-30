import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const login = createAsyncThunk('auth/login', async res => {
  return await firestore()
    .collection('Users')
    // Filter results
    .where('id', '==', res)
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs[0]._data;
      /* ... */
    });
});

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    userloggedIn: false,
    loading: false,
    data: null,
    token: null,
  },
  reducers: {
    Logout(state){
      state.userloggedIn = false
            state.loading = false
            state.data = {}
            state.token = ""
    },
    Editdata(state, action) {
      state.data=action.payload
      console.log("updated state:",state)
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userloggedIn = action.payload.id.trim().length > 0 ? true : false;
      state.token = action.payload.id;
      state.data = action.payload;
      console.log("state===>:",state)
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {Editdata,Logout} = AuthSlice.actions;
export default AuthSlice.reducer;
