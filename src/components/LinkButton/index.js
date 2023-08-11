import './style.scss';
import { Link } from 'react-router-dom';

export function LinkButton({ link, value }) {
    return (
        <div className='link-button-contenair'>
            <Link className='link-button-item' to={link}>{value}</Link>
        </div>
    )
}

