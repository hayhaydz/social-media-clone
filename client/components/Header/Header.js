import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { logout } from '../../utils/auth';
import { UserIcon } from '@heroicons/react/outline';

const Header = ({ jwt, currentUsersUsername }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if(searchQuery.replace(/\s/g,'') !== '') {
            Router.push({
                pathname: '/search',
                query: { q: searchQuery }
            });
        }
    }

    const handleProfileClick = (e) => {
        e.preventDefault();
        Router.push({
            pathname: `/u/${currentUsersUsername}`
        });
    }

    const handleSettingsClick = (e) => {
        e.preventDefault();
        Router.push({
            pathname: `/settings`
        });
    }

    return (
        <header className="navbar mb-8 flex flex-col items-start md:flex-row shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-1 px-0 mx-0">
                <Link href="/home"><button className="btn btn-ghost"><span className="text-lg font-bold lowercase">neem</span></button></Link>
            </div>
            {jwt && 
                <div className="md:flex-none">
                    <form action="#" className="form-control mr-2" onSubmit={handleSearchSubmit}>
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
                    <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost btn-square" tabIndex="0"><UserIcon className="w-6 h-6 mx-2" /></button>
                        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-neutral rounded-box w-52 overflow-visible gap-2">
                            <li className="before:hidden !pl-0 !my-0">
                                <a className="btn btn-ghost btn-sm flex items-center normal-case modal-button !no-underline !p-2" onClick={handleProfileClick}>View Profile</a>
                            </li>
                            <li className="before:hidden !pl-0 !my-0">
                                <a className="btn btn-ghost btn-sm flex items-center normal-case modal-button !no-underline !p-2" onClick={handleSettingsClick}>Settings</a>
                            </li>
                            <li className="before:hidden !pl-0 !my-0">
                                <a className="btn btn-ghost btn-sm normal-case !text-red-600 modal-button !no-underline !p-2" onClick={logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </header>
    )
}
export default Header;