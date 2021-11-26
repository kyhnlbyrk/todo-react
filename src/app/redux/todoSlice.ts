import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { getAllToDo } from '../api/todoAPI';
import { Todo } from '../model/todo';

export interface TodoState {
    list: Todo[],
    loading: boolean,
    orderType: string,
    search: string
}

const initialState: TodoState = {
    list: [],
    loading: true,
    orderType: 'asc',
    search: ''
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
        changeToDoList: (state, action: PayloadAction<any>) => {
            console.log('action = ', action);
            state.loading = false
            state.list = action.payload.list;
            state.search = action.payload.search;
            state.orderType = action.payload.orderType
        },
    }
});

export const { changeToDoList } = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectList = (state: RootState) => state.todo.list;
export const selectLoading = (state: RootState) => state.todo.loading;
export const selectOrderType = (state: RootState) => state.todo.orderType;
export const selectSearch = (state: RootState) => state.todo.search;

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

export const fetchAll = (search:string, orderType:string) : AppThunk => (
    dispatch
) => {
   getAllToDo(search, orderType).then((data) => {
    dispatch(changeToDoList({ list: data.data, search, orderType }));
   });
};

export default todoSlice.reducer;
