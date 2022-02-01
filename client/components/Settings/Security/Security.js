import React, { useState } from 'react';
import Router from 'next/router';
import { logout } from '../../../utils/auth';
import { postAuth } from '../../../utils/apiHandler';

const SecuritySettings = ({jwt, changedFields, setChangedFields, setError }) => {
    const originalData = { currentPassword: '', newPassword: '', repeatPassword: '' };
    const [userSecurityData, setUserSecurityData] = useState({ currentPassword: '', newPassword: '', repeatPassword: '' });
    const [isEditingSecurity, setIsEditingSecurity] = useState(false);

    const handleSecurityInputChange = (e) => {
        setChangedFields([]);
        setIsEditingSecurity(false);
        for(let key in userSecurityData) {
            if(document.getElementById(key).value != [originalData[key]]) {
                setChangedFields({...changedFields, [key]: document.getElementById(key).value});
                setIsEditingSecurity(true);
            }
        }

        setUserSecurityData({
            ...userSecurityData,
            [e.target.name]: e.target.value
        })
    }

    const handleSecuritySave = async (e) => {
        e.preventDefault();
        setError('');

        if(userSecurityData.newPassword === userSecurityData.repeatPassword) {
            let data = {
                password: {
                    current: userSecurityData.currentPassword,
                    new: userSecurityData.newPassword
                }
            }

            const response = await postAuth(data, `${process.env.PRIVATE_API_URL}/api/user/update`, jwt);
            response.json().then(async (result) => {
                if(result.status === 'success') {
                    logout();
                    Router.push({pathname: '/'});
                } else {
                    setUserSecurityData({
                        ...userSecurityData,
                        currentPassword: '',
                        newPassword: '',
                        repeatPassword: ''
                    });
                    setIsEditingSecurity(false);
                    console.log('There was an error with changing your password. Error message:', result.message);
                    setError(result.message);
                }
            });
        } else {
            console.log('Your passwords do not match!');
            setError('Your passwords do not match!');
        }
    }

    return (
        <div className="mb-8">
            <h3 className="!mt-8 !mb-2">Security</h3>
            <div className="mb-4">
                <label htmlFor="currentpPassword">Current Password</label>
                <input 
                    type="password" 
                    id="currentPassword"
                    className="input input-bordered block w-full"
                    name="currentPassword"
                    value={userSecurityData.currentPassword}
                    onChange={handleSecurityInputChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="newPassword">New Password</label>
                <input 
                    type="password" 
                    id="newPassword"
                    className="input input-bordered block w-full"
                    name="newPassword"
                    value={userSecurityData.newPassword}
                    onChange={handleSecurityInputChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="repeatPassword">Repeat Password</label>
                <input 
                    type="password" 
                    id="repeatPassword"
                    className="input input-bordered block w-full"
                    name="repeatPassword"
                    value={userSecurityData.repeatPassword}
                    onChange={handleSecurityInputChange}
                    required
                />
            </div>
            <button className={"btn btn-primary " + (!isEditingSecurity && "btn-disabled")} disabled={!isEditingSecurity && "disabled"} onClick={handleSecuritySave}>Change Password</button>
        </div>
    )
}
export default SecuritySettings;