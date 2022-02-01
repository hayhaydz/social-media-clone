import React, { useState } from 'react';
import { postAuth, post } from '../../../utils/apiHandler';

const AccountSettings = ({ jwt, username, email, verification, changedFields, setChangedFields, setError }) => {
    const originalData = { username: username, email: email };
    const [userAccountData, setUserAccountData] = useState({ username: username, email: email });
    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [verificationState, setVerificationState] = useState(verification);

    const handleAccountInputChange = (e) => {
        setChangedFields([]);
        setIsEditingAccount(false);
        for(let key in userAccountData) {
            if(document.getElementById(key).value != [originalData[key]]) {
                setChangedFields({...changedFields, [key]: document.getElementById(key).value});
                setIsEditingAccount(true);
            }
        }

        setUserAccountData({
            ...userAccountData,
            [e.target.name]: e.target.value
        })
    }

    const handleAccountSave = async (e) => {
        e.preventDefault();
        setError('');

        const response = await postAuth(changedFields, `${process.env.PRIVATE_API_URL}/api/user/update`, jwt);
        response.json().then(async (result) => {
            if(result.status === 'success') {
                originalData.username = result.data.username;
                originalData.email = result.data.email;
                setVerificationState(result.data.verification);
                setIsEditingAccount(false);
            } else {
                setUserAccountData({
                    ...userAccountData,
                    username: result.data.username,
                    email: result.data.email,
                });
                setIsEditingAccount(false);
                console.log('There was an error with updating your information. Error message:', result.message);
                setError(result.message);
            }
        });
    }

    const handleResendVerify = async (e) => {
        e.preventDefault();

        const data = {
            email: userAccountData.email
        };

        const response = await post(data, `${process.env.PRIVATE_API_URL}/api/auth/resendVerify`);
        response.json().then(async (result) => {
            if(result.status === 'success') {
                console.log(result);
            } else {
                console.log('There was an error with resending the verification email. Error message:', result.message);
                setError(result.message);
            }
        });
    }

    return (
        <div>
            <h3 className="!mt-8 !mb-2">Account</h3>
            <div className="mb-4">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username"
                    className="input input-bordered block w-full"
                    name="username"
                    value={userAccountData.username}
                    onChange={handleAccountInputChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email">Email Address</label>
                <input 
                    type="text" 
                    id="email"
                    className="input input-bordered block w-full"
                    name="email"
                    value={userAccountData.email}
                    onChange={handleAccountInputChange}
                    required
                />
                {!verificationState &&
                    <p className="text-sm !my-0">Email address is not verified. <button className="btn btn-link px-0 pl-2" onClick={handleResendVerify}>Resend Link</button></p>
                }
            </div>
            <button className={"btn btn-primary " + (!isEditingAccount && "btn-disabled")} disabled={!isEditingAccount && "disabled"} onClick={handleAccountSave}>Save Changes</button>
        </div>
    )
}
export default AccountSettings;