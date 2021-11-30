import Link from 'next/link';
import { logout } from '../../utils/auth';
import { LogoutIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { Modal, CreatePost } from '../';

const Header = ({ jwt }) => {
    return (
        <header className="navbar mb-8 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-1 px-2 mx-2">
                <Link href="/home"><button className="btn btn-ghost"><span className="text-lg font-bold lowercase">neem</span></button></Link>
            </div>
            {jwt && 
                <div className="flex-none">
                    <label htmlFor="createModal" className="btn btn-ghost btn-square modal-button"><PlusCircleIcon className="w-6 h-6 mx-2" /></label>
                    <button className="btn btn-ghost btn-square" onClick={logout}><LogoutIcon className="w-6 h-6 mx-2" /></button>
                    <Modal id="createModal"><CreatePost jwt={jwt} /></Modal>
                </div>
            }
        </header>
    )
}
export default Header;