import { useCallback } from "react";
import { RiSearch2Line } from "react-icons/ri";
import _ from 'lodash';

interface Props {
    isDebounce: boolean, 
    onChange: (text: string) => void, 
    icon?: string, 
    placeholder: string,
    inputValue?: string
}

const Input = (props: Props) => {
    const { isDebounce, onChange, icon, placeholder, inputValue } = props;
    
    const handleDebounceFn = (value:string) => {
        onChange(value);
    }

    const debounceFn = useCallback(_.debounce(handleDebounceFn, 300), [props]);

    const getIcon = () => {
        switch (icon) {
            case 'search':
                return <RiSearch2Line className="icon" />;
            default:
                break;
        }
    };

    return (
        <div className="form-outline">
            <input placeholder={placeholder} value={inputValue} onChange={(event) => { isDebounce ? debounceFn(event.target.value) :  onChange(event.target.value)}} type="search" className="form-control text-input" />
            {icon &&
                getIcon()
            }
        </div>
    );
}

export default Input;
