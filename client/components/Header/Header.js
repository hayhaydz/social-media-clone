import Link from 'next/link';
import { logout } from '../../utils/auth';
import { LogoutIcon, PlusCircleIcon } from '@heroicons/react/outline';
import CreatePost from '../Post/CreatePost/CreatePost';

const Header = ({ jwt }) => {
    return (
        <header className="navbar mb-8 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-1 px-2 mx-2">
                <Link href="/"><button className="btn btn-ghost"><span className="text-lg font-bold lowercase">neem</span></button></Link>
            </div>
            {jwt && 
                <div className="flex-none">
                    <label htmlFor="my-modal" className="btn btn-ghost btn-square modal-button"><PlusCircleIcon className="w-6 h-6 mx-2" /></label>
                    <input type="checkbox" id="my-modal" className="modal-toggle" /> 
                    <div className="modal">
                        <CreatePost />
                    </div>
                    <button className="btn btn-ghost btn-square" onClick={logout}><LogoutIcon className="w-6 h-6 mx-2" /></button>
                </div>
            }
        </header>
    )
}
export default Header;