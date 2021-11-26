import { BiError } from "react-icons/bi";

const Error = () => {
    return (
        <div className='error-box'>
            <BiError className='big-icon'/>
            <span>
                Ooops something went wrong!
            </span>
        </div>
    );
}

export default Error;
