import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectList,
    fetchAll,
    selectLoading,
    selectOrderType,
    selectError
} from '../redux/todoSlice';
import Loading from './components/Loading';
import Error from './components/Error';
import TodoItem from './components/TodoItem';
import { RiArrowUpLine } from "react-icons/ri";

export function Todo() {
    const todoList = useAppSelector(selectList);
    const loading = useAppSelector(selectLoading);
    const orderType = useAppSelector(selectOrderType);
    const error = useAppSelector(selectError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAll('', orderType));
    }, []);

    return (
        <>
            {loading ? <Loading /> :
                error ? <Error /> :
                    todoList.length < 1 ?
                        <div className="indicator-box">
                            <h3>
                                You do not have a todo list. <br />
                                Follow the jumping arrow and create a new todo.
                            </h3>
                            <div className="bouncing-arrow-wrapper">
                                <div className="bouncing-arrow">
                                    <RiArrowUpLine className="big-icon" />
                                </div>
                            </div>
                        </div>
                        :
                        <div className="container d-flex wrapper">
                            <div className="row align-middle flex-1">
                                {todoList.map((todo) =>
                                    <TodoItem key={todo.id} {...todo} />

                                )}

                            </div>
                        </div>}
        </>
    );
}
