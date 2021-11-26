import Input from "./components/Input"
import { RiArrowUpLine } from "react-icons/ri";
import { RiArrowDownLine } from "react-icons/ri";
import { useAppDispatch } from "../hooks";
import { fetchAll } from "../redux/todoSlice";


const Header = () => {

    const dispatch = useAppDispatch();
    
    return (
        <div className="header">
            <div className="d-flex header-buttons">
                <div className="cursor-pointer">
                    <RiArrowUpLine />
                </div>
                <div className="cursor-pointer">
                    <RiArrowDownLine />
                </div>
            </div>
            <Input onChange={(val: string) => dispatch(fetchAll(val))} icon="search" />
        </div>
    );
}

export default Header;
