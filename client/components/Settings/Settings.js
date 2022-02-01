import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getAuth } from '../../utils/apiHandler';
import { ProfileSettings, AccountSettings, SecuritySettings, DeleteSettings, Error, Modal } from '../';

const Settings = ({ jwt, currentUsersID, message, setMessage }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const url = `${process.env.PRIVATE_API_URL}/api/user`;
    const { data: response = {}, isLoading, isError } = useSWR([url, jwt], fetcher);

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Fetching posts has failed</div>;

    const [isDeleting, setIsDeleting] = useState(false);
    const [changedFields, setChangedFields] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        if(error !== '') {
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }, [error]);

    
    const handleDelClick = (e) => {
        e.stopPropagation();
        setIsDeleting(!isDeleting);
    }

    return (
        <div className="pb-32 max-w-xl">
            <h1 className="!mt-8 !mb-4">Settings</h1>
            {error !== '' &&
                <Error text={error}/>
            }
            {response.data &&
                <>
                    <ProfileSettings jwt={jwt} first_name={response.data.first_name} last_name={response.data.last_name} description={response.data.description} changedFields={changedFields} setChangedFields={setChangedFields} setError={setError}/>        
                    <AccountSettings jwt={jwt} username={response.data.username} email={response.data.email} verification={response.data.verification} changedFields={changedFields} setChangedFields={setChangedFields} setError={setError}/>
                    <SecuritySettings jwt={jwt} changedFields={changedFields} setChangedFields={setChangedFields} setError={setError}/>

                    <button className="btn btn-ghost" onClick={handleDelClick}>Delete your account</button>
                    {isDeleting &&
                        <Modal id="deleteModal" ><DeleteSettings jwt={jwt} isDeleting={isDeleting} setIsDeleting={setIsDeleting} /></Modal>
                    }
                </>
            }
        </div>
    )
}
export default Settings;