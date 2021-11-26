import { useCallback } from "react";
import { RiSearch2Line } from "react-icons/ri";
import _ from 'lodash';

const Input = (props: any) => {
    const { onChange, icon } = props;
    
    const handleDebounceFn = (value:string) => {
        onChange(value);
    }

    const debounceFn = useCallback(_.debounce(handleDebounceFn, 300), []);

    const getIcon = () => {
        switch (icon) {
            case 'search':
                return <RiSearch2Line className="icon" />;
            default:
                break;
        }
    };

    console.log(icon);

    return (
        <div className="form-outline">
            <input placeholder="Search..." onChange={(event) => { debounceFn(event.target.value) }} type="search" className="form-control text-input" />
            {icon &&
                getIcon()
            }
        </div>
    );
}

export default Input;
