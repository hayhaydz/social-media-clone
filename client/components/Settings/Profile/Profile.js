import React, { useState } from 'react';
import { postAuth } from '../../../utils/apiHandler';

const ProfileSettings = ({ jwt, first_name, last_name, description, changedFields, setChangedFields, setError }) => {
    const originalData = { first_name: first_name, last_name: last_name, description: description };
    const [userProfileData, setUserProfileData] = useState({ first_name: first_name, last_name: last_name, description: description ?? '' });
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const handleProfileInputChange = (e) => {
        setChangedFields([]);
        setIsEditingProfile(false);
        for(let key in userProfileData) {
            if(document.getElementById(key).value != [originalData[key]]) {
                setChangedFields({...changedFields, [key]: document.getElementById(key).value});
                setIsEditingProfile(true);
            }
        }

        setUserProfileData({
            ...userProfileData,
            [e.target.name]: e.target.value
        })
    }

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setError('');

        const response = await postAuth(changedFields, `${process.env.PRIVATE_API_URL}/api/user/update`, jwt);
        response.json().then(async (result) => {
            if(result.status === 'success') {
                setIsEditingProfile(false);
            } else {
                setUserProfileData({
                    ...userProfileData,
                    first_name: result.data.first_name,
                    last_name: result.data.last_name,
                    description: result.data.description ?? '',
                });
                setIsEditingProfile(false);
                console.log('There was an error with updating your information. Error message:', result.message);
                setError(result.message);
            }
        });
    }

    return (
        <div>
            <h3 className="!mt-8 !mb-2">Profile</h3>
            <div className="mb-4">
                <label htmlFor="first_name">First Name</label>
                <input 
                    type="text" 
                    id="first_name"
                    className="input input-bordered block w-full"
                    name="first_name"
                    value={userProfileData.first_name}
                    onChange={handleProfileInputChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="last_name">Last Name</label>
                <input 
                    type="text" 
                    id="last_name"
                    className="input input-bordered block w-full"
                    name="last_name"
                    value={userProfileData.last_name}
                    onChange={handleProfileInputChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description">Bio</label>
                <textarea 
                    type="text" 
                    id="description"
                    className="textarea textarea-bordered block resize-none h-48 w-full mb-4"
                    name="description"
                    value={userProfileData.description}
                    onChange={handleProfileInputChange}
                    required
                />
            </div>
            <button className={"btn btn-primary " + (!isEditingProfile && "btn-disabled")} disabled={!isEditingProfile && "disabled"} onClick={handleProfileSave}>Save Changes</button>
        </div>
    )
}
export default ProfileSettings;