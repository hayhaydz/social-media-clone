import { CheckCircleIcon } from '@heroicons/react/outline';

const Success = ({text}) => {
    return (
        <div className="alert alert-success mb-4 !opacity-100 fixed bottom-0 w-full max-w-xl bg-base-300 z-50">
            <div className="flex-1 items-center">
                <CheckCircleIcon className="w-6 h-6 mx-2"/>
                <label>{text}</label>
            </div>
        </div>
    )
}
export default Success;