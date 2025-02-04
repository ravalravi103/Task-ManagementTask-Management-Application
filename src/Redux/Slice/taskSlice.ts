import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

type TaskStatus = "Pending" | "In Progress" | "Completed";

type Task = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    status: TaskStatus;
};

interface TaskState {
    data: Task[];
    loading: boolean;
    error: string;
}

const initialState: TaskState = {
    data: [],
    error: "",
    loading: false
};


export const fetchTasks = createAsyncThunk(
    'task/fetchTasks',
    async ({ page, rowsPerPage }: { page: number; rowsPerPage: number }, { rejectWithValue }) => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            page,      
            _per_page: rowsPerPage 
          }
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  

export const createNewTask = createAsyncThunk('task/createNewTask', async (task: Omit<Task, 'id'>, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const updateExistingTask = createAsyncThunk('task/updateTask', async (task: Partial<Task>, { rejectWithValue }) => {
    try {
        console.log(task, "This is the Task, in Update")
        const response = await axios.put(`${API_URL}/${task.id}`, task);
        console.log(response, "This is the response, in Update")

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const deleteTaskById = createAsyncThunk('task/deleteTask', async (id: number, { rejectWithValue }) => {
    try {
        console.log(id, "This is the id, in Update")
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log(response, "This is the response, in Delete")
        return id;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.data = action.payload;
                state.loading = false;
                
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createNewTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.data.push(action.payload);
                state.loading = false;
            })
            .addCase(createNewTask.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateExistingTask.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.data.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateExistingTask.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteTaskById.fulfilled, (state, action: PayloadAction<number>) => {
                state.data = state.data.filter(task => task.id !== action.payload);
            })
            .addCase(deleteTaskById.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

export const taskReducer = taskSlice.reducer


