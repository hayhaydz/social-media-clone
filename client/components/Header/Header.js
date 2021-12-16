import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router'
import { logout } from '../../utils/auth';
import { LogoutIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { Modal, CreatePost } from '../';

const Header = ({ jwt, setMessage }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        Router.push({
            pathname: '/search',
            query: { q: searchQuery }
        });
    }

    return (
        <header className="navbar mb-8 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-1 px-2 mx-2">
                <Link href="/home"><button className="btn btn-ghost"><span className="text-lg font-bold lowercase">neem</span></button></Link>
            </div>
            {jwt && 
                <div className="flex-none">
                    <form action="#" className="form-control mr-8" onSubmit={handleSearchSubmit}>
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                className="w-full input input-ghost input-bordered"
                                placeholder="Search users" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label='Search'
                            />
                            <button type="submit" className="btn btn-primary btn-outline">go</button>
                        </div>
                    </form>
                    <label htmlFor="createModal" className="btn btn-ghost btn-square modal-button mr-2"><PlusCircleIcon className="w-6 h-6 mx-2" /></label>
                    <button className="btn btn-ghost btn-square" onClick={logout}><LogoutIcon className="w-6 h-6 mx-2" /></button>
                    <Modal id="createModal"><CreatePost jwt={jwt} setMessage={setMessage} /></Modal>
                </div>
            }
        </header>
    )
}
export default Header;