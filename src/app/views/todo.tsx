import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectList,
    fetchAll,
    selectLoading,
    selectOrderType
} from '../redux/todoSlice';
import TodoItem from './components/TodoItem';

export function Todo() {
    const todoList = useAppSelector(selectList);
    const loading = useAppSelector(selectLoading);
    const orderType = useAppSelector(selectOrderType);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAll('', orderType));
    }, []);
    console.log(todoList);
    return (
        <>
            {loading ? <div> LOADING </div> :
                <div className="container d-flex wrapper">
                    <div className="row align-middle flex-1">
                        {todoList.map((todo) => 
                            <TodoItem {...todo} />
                            
                        )}
                        
                    </div>
                </div>}
        </>
    );
}
