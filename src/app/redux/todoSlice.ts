import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { getAllToDo } from '../api/todoAPI';
import { Todo } from '../model/todo';

export interface TodoState {
    list: Todo[],
    loading: boolean
}

const initialState: TodoState = {
    list: [],
    loading: true
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        /*decrement: (state) => {
            state.value -= 1;
        },*/
        // Use the PayloadAction type to declare the contents of `action.payload`
        changeToDoList: (state, action: PayloadAction<Todo[]>) => {
            state.loading = false
            state.list = action.payload;
        },
    }
});

export const { changeToDoList } = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectList = (state: RootState) => state.todo.list;
export const selectLoading = (state: RootState) => state.todo.loading;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd = (amount: number): AppThunk => (
    dispatch,
    getState
) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
        dispatch(incrementByAmount(amount));
    }
};*/

export const fetchAll = (search:string) : AppThunk => (
    dispatch
) => {
   getAllToDo(search).then((data) => {
    console.log(data);
    dispatch(changeToDoList(data.data));
   });
};

export default todoSlice.reducer;
