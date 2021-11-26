import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className='indicator-box'>
            <Spinner animation="border" role="status" />
            <span className="sr-only">
                Please wait...
            </span>
        </div>
    );
}

export default Loading;
