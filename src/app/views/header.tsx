import Input from "./components/Input"
import { RiArrowUpLine } from "react-icons/ri";
import { RiArrowDownLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchAll, selectOrderType, selectSearch } from "../redux/todoSlice";


const Header = () => {

    const dispatch = useAppDispatch();
    const orderType =  useAppSelector(selectOrderType);
    const search =  useAppSelector(selectSearch);

    const searchHandle = (val:string) => {
        dispatch(fetchAll(val, orderType));
    }
    
    return (
        <div className="header">
            <div className="d-flex header-buttons">
                <div onClick={() => dispatch(fetchAll(search, 'asc' ))} className={"cursor-pointer" + (orderType === 'asc' ? ' button-active' : '')}>
                    <RiArrowUpLine />
                </div>
                <div onClick={() => dispatch(fetchAll(search, 'desc' ))} className={"cursor-pointer" + (orderType === 'desc' ? ' button-active' : '') }>
                    <RiArrowDownLine />
                </div>
            </div>
            <Input onChange={(val: string) => searchHandle(val)} icon="search" />
        </div>
    );
}

export default Header;
