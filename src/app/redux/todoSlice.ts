import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { getAllToDo, changeStatus, deleteTodo, createNewTodo } from '../api/todoAPI';
import { Todo } from '../model/todo';

export interface TodoState {
    list: Todo[],
    loading: boolean,
    orderType: string,
    search: string,
    error: boolean
}

const initialState: TodoState = {
    list: [],
    loading: true,
    orderType: 'asc',
    search: '',
    error: false
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
            state.loading = false
            state.list = action.payload.list;
            state.search = action.payload.search;
            state.orderType = action.payload.orderType
        },

        setError: (state, action: PayloadAction<any>) => {
            state.error = action.payload.error;
        }
    }
});

export const { changeToDoList, setError } = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectList = (state: RootState) => state.todo.list;
export const selectLoading = (state: RootState) => state.todo.loading;
export const selectOrderType = (state: RootState) => state.todo.orderType;
export const selectSearch = (state: RootState) => state.todo.search;
export const selectError = (state: RootState) => state.todo.error;

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

export const fetchAll = (search: string, orderType: string): AppThunk => (
    dispatch
) => {
    getAllToDo(search, orderType).then((data) => {
        dispatch(changeToDoList({ list: data.data, search, orderType }));
    }).catch((error) => {
        dispatch(setError(true));
    });
};

export const addNewItem = (name: string, search: string, orderType: string): AppThunk => (
    dispatch
) => {
    createNewTodo(name).then(() => {
        getAllToDo(search, orderType).then((data) => {
            dispatch(changeToDoList({ list: data.data, search, orderType }));
        }).catch(() => {
            dispatch(setError(true));
        });
    }).catch(() => {
        dispatch(setError(true));
    });
}

export const completeToDo = (id: number | undefined, search: string, orderType: string): AppThunk => (
    dispatch
) => {
    changeStatus(id).then(() => {
        getAllToDo(search, orderType).then((data) => {
            dispatch(changeToDoList({ list: data.data, search, orderType }));
        }).catch((error) => {
            dispatch(setError(true));
        });
    }).catch(() => {
        dispatch(setError(true));
    });
};

export const deleteToDo = (id: number | undefined, search: string, orderType: string): AppThunk => (
    dispatch
) => {
    deleteTodo(id).then(() => {
        getAllToDo(search, orderType).then((data) => {
            dispatch(changeToDoList({ list: data.data, search, orderType }));
        }).catch((error) => {
            dispatch(setError(true));
        });
    }).catch(() => {
        dispatch(setError(true));
    });
};

export default todoSlice.reducer;
