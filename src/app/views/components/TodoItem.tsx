import React from 'react';
import { Todo } from '../../model/todo';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import moment from 'moment';
import { BsClock } from "react-icons/bs";
import Button from 'react-bootstrap/Button'


const TodoItem = (props: Todo) => {
    const { id, name, created_time, modified_time, status } = props;
    //console.log(props);
    return (
        <div className='col-xl-3 col-lg-4 col-md-6 mb-3'>
            <div className={'todo-item' + (status === 1 ? ' completed' : '')}>
                <OverlayTrigger
                    delay={500}
                    trigger="hover"
                    overlay={<Popover body> {name} </Popover>}>
                    <div className='item-header'>
                        <h3>{name}</h3>
                    </div>
                </OverlayTrigger>

                <div className='item-body d-flex'>
                    <div className='body-item d-flex'>
                        <div className='body-item d-flex'>
                            <BsClock className='item-icon'/>
                            <p className="label">Modified Date</p>
                        </div>
                        <p className="tiny-text">{moment(modified_time).format('DD.MM.YYYY HH:mm')}</p>
                    </div>

                    <div className='body-item d-flex'>
                        <div className='body-item d-flex'>
                            <BsClock className='item-icon'/>
                            <p className="label">Created Time</p>
                        </div>
                        <p className="tiny-text">{moment(created_time).format('DD.MM.YYYY HH:mm')}</p>
                    </div>
                </div>

                <div className='item-footer'>
                    <Button disabled={status === 1} size="lg" variant="success">Complete</Button>

                    <Button size="lg" variant="outline-danger">Complete</Button>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
