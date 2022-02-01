import { ExclamationCircleIcon } from '@heroicons/react/outline';

const Error = ({text}) => {
    return (
        <div className="alert alert-error mt-8 z-50">
            <div className="flex-1 items-center">
                <ExclamationCircleIcon className="w-6 h-6 mx-2"/>
                <label>{text}</label>
            </div>
        </div>
    )
}
export default Error;