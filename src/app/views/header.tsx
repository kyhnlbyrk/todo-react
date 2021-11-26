import Input from "./components/Input"
import { RiArrowUpLine } from "react-icons/ri";
import { RiArrowDownLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchAll, selectOrderType, selectSearch, addNewItem } from "../redux/todoSlice";
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import AddEditModal from "./components/AddEditModal";


const Header = () => {

    const dispatch = useAppDispatch();
    const orderType = useAppSelector(selectOrderType);
    const search = useAppSelector(selectSearch);
    const [modalVisible, setModalVisible] = useState(false);

    const searchHandle = (val: string) => {
        dispatch(fetchAll(val, orderType));
    }

    const addToDo = (val: string) => {
        setModalVisible(false);
        dispatch(addNewItem(val, search, orderType));
    }

    return (
        <>
            <AddEditModal show={modalVisible} onHide={ () => { setModalVisible(false) }} onSuccess={ (val: string) => { addToDo(val) }}></AddEditModal>
            <div className="header">
                <div className="d-flex header-buttons">
                    <div onClick={() => dispatch(fetchAll(search, 'asc'))} className={"cursor-pointer" + (orderType === 'asc' ? ' button-active' : '')}>
                        <RiArrowUpLine />
                    </div>
                    <div onClick={() => dispatch(fetchAll(search, 'desc'))} className={"cursor-pointer" + (orderType === 'desc' ? ' button-active' : '')}>
                        <RiArrowDownLine />
                    </div>
                </div>
                <div className="d-flex flex-direction-row">
                    <Input onChange={(val: string) => searchHandle(val)} icon="search" placeholder={"Search..."} isDebounce={true} />
                    <Button className="tiny-button" onClick={() => { setModalVisible(true) }} variant="success">Add</Button>
                </div>
            </div>
        </>
    );
}

export default Header;
