import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

export default store;
