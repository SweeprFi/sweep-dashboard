import { ArrowRightIcon } from '@heroicons/react/20/solid';

const ExternalLink = (props) => {
    return (
        <a href={props.link} className="flex items-center font-archivo-light gap-1 hover:underline text-app-gray-dark hover:text-white" target="_blank" rel="noreferrer">
            {props.title}
            <ArrowRightIcon className="-rotate-45 w-5 h-5" />
        </a>
    )
}

export default ExternalLink;