import { CheckCircleIcon } from '@heroicons/react/outline';

const Error = ({text}) => {
    return (
        <div className="alert alert-success mt-8">
            <div className="flex-1 items-center">
                <CheckCircleIcon className="w-6 h-6 mx-2"/>
                <label>{text}</label>
            </div>
        </div>
    )
}
export default Error;