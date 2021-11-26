import React, { useState } from 'react';
import { Todo } from '../../model/todo';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import moment from 'moment-timezone';
import { BsClock } from "react-icons/bs";
import { RiEditLine } from "react-icons/ri";
import Button from 'react-bootstrap/Button'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { completeToDo, selectOrderType, selectSearch, deleteToDo, editItem } from '../../redux/todoSlice';
import Modal from 'react-bootstrap/Modal'
import AddEditModal from './AddEditModal';


const TodoItem = (props: Todo) => {
    const { id, name, created_time, modified_time, status } = props;
    //console.log(props);
    const dispatch = useAppDispatch();
    const orderType = useAppSelector(selectOrderType);
    const search = useAppSelector(selectSearch);

    const [deletePopupShow, setDeletePopupShow] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);

    const complete = () => {
        dispatch(completeToDo(id, search, orderType));
    }

    const deleteItem = () => {
        setDeletePopupShow(false);
        dispatch(deleteToDo(id, search, orderType));
    }

    const edit = (val:string) => {
        dispatch(editItem(id, val, search, orderType));
        setEditModal(false);
    }

    const timezone = moment.tz.guess();

    return (
        <>
            {editModal && <AddEditModal id={id} name={name} show={editModal} onHide={ () => { setEditModal(false) }} onSuccess={ (val: string) => { edit(val) }}></AddEditModal>}
            <Modal show={deletePopupShow} onHide={() => { setDeletePopupShow(false) }}>
                <Modal.Header>
                    <Modal.Title>Hold on!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{name} will be deleted for ever! Are you sure about it?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { deleteItem() }} size="lg" variant="success">Yes, I am sure</Button>
                    <Button onClick={() => { setDeletePopupShow(false) }} size="lg" variant="outline-danger">Cancel</Button>
                </Modal.Footer>
            </Modal>
            <div className='col-xl-3 col-lg-4 col-md-6 mb-3'>
                <div className={'todo-item' + (status === 1 ? ' completed' : '')}>
                    <div className='item-header'>
                        <div className='w-100'>
                            <OverlayTrigger
                                delay={500}
                                overlay={<Popover body> {name} </Popover>}>
                                <h3>{name}</h3>
                            </OverlayTrigger>
                        </div>
                        {status !== 1 && 
                            <div className="edit" onClick={() => { setEditModal(true)} }>
                                <RiEditLine className="cursor-pointer"></RiEditLine>
                            </div>
                        }
                    </div>

                    <div className='item-body d-flex'>
                        <div className='body-item d-flex'>
                            <div className='body-item d-flex'>
                                <BsClock className='item-icon' />
                                <p className="label">Modified Date</p>
                            </div>
                            <p className="tiny-text">{moment.tz(modified_time, timezone).format('DD.MM.YYYY HH:mm')}</p>
                        </div>

                        <div className='body-item d-flex'>
                            <div className='body-item d-flex'>
                                <BsClock className='item-icon' />
                                <p className="label">Created Time</p>
                            </div>
                            <p className="tiny-text">{moment.tz(created_time, timezone).format('DD.MM.YYYY HH:mm')}</p>
                        </div>
                    </div>

                    <div className='item-footer'>
                        <Button onClick={() => { complete() }} disabled={status === 1} size="lg" variant="success">Complete</Button>

                        <Button onClick={() => { setDeletePopupShow(true) }} size="lg" variant="outline-danger">Delete</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoItem;
