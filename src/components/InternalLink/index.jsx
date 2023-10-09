import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

const InternalLink = (props) => {
    return (
        <Link to={props.link} className="flex items-center font-archivo-light gap-1 hover:underline text-app-gray-dark hover:text-white">
            {props.title}
            <ArrowRightIcon className="-rotate-45 w-5 h-5" />
        </Link>
    )
}

export default InternalLink;