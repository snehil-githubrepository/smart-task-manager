import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const loadTasksFromStorage = createAsyncThunk(
  "tasks/loadFromStorage",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const tasksFromStorage = JSON.parse(localStorage.getItem("tasks")) || [];
      dispatch(setTasks(tasksFromStorage));
    } catch (error) {
      dispatch(setError("Failed to load tasks from storage"));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const saveTasksToStorage = createAsyncThunk(
  "tasks/saveToStorage",
  async (tasks, { dispatch }) => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      dispatch(setError("Failed to save tasks to storage"));
    }
  }
);

export const addTaskWithStorage = createAsyncThunk(
  "tasks/addWithStorage",
  async (newTask, { dispatch, getState }) => {
    try {
      dispatch(addTask(newTask));
      const { tasks } = getState().tasks;
      await dispatch(saveTasksToStorage(tasks));
    } catch (error) {
      dispatch(setError("Failed to add task"));
    }
  }
);

export const updateTaskWithStorage = createAsyncThunk(
  "tasks/updateWithStorage",
  async (updatedTask, { dispatch, getState }) => {
    try {
      dispatch(updateTask(updatedTask));
      const { tasks } = getState().tasks;
      await dispatch(saveTasksToStorage(tasks)); 
    } catch (error) {
      dispatch(setError("Failed to update task"));
    }
  }
);

export const deleteTaskWithStorage = createAsyncThunk(
  "tasks/deleteWithStorage",
  async (taskId, { dispatch, getState }) => {
    try {
      dispatch(deleteTask(taskId));
      const { tasks } = getState().tasks;
      await dispatch(saveTasksToStorage(tasks));
    } catch (error) {
      dispatch(setError("Failed to delete task"));
    }
  }
);

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setLoading,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;
