import { ObjectID } from "bson";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services";
import { User } from "../../types";
import './styles.css'



export function SignUp() {
    
    const [userInfo, setUserInfo] = useState<any>({})
    const navigate = useNavigate();


    function onUserInfoChange(value: any, field: any) {
        let workingObj = userInfo;
        workingObj[field] = value
        setUserInfo(workingObj)
    }


    function onSubmitSignup(new_user_data: any) {
        new_user_data.preventDefault()
        const user_to_add_obj = {
            'id': new ObjectID().toString(),
            'firstName': userInfo?.firstName,
            'lastName': userInfo?.lastName,
            'email': userInfo?.email,
            'password': userInfo?.password,
            'phoneNumber': userInfo?.phoneNumber,
            'role': 'user',
            'todos': [],
            'accountsInfo': [],
            'events': []
        }

        let to_add : User  = JSON.parse(JSON.stringify(user_to_add_obj));
  
        userService.createNewUser(to_add).then((resp: any) => {
            navigate('/login')
        })
    }


    return (
        <div className='sign-up-wrapper'>
            <div className='left-side'>

            </div>
            <div className='right-side'>
                <div className='form-container'>
                    <form onSubmit={onSubmitSignup}>
                        <div className='form-row'>
                            <label> First Name: </label>
                            <input
                                name="firstName"
                                id="firstName"
                                type="text"
                                value={userInfo?.firstName}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'firstName')}
                            />
                        </div>
                        <div className='form-row'>
                            <label> Last Name: </label>
                            <input
                                name="lastName"
                                id="lastName"
                                type="text"
                                value={userInfo?.lastName}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'lastName')}
                            />
                        </div>
                        <div className='form-row'>
                            <label> Email: </label>
                            <input
                                name="email"
                                id="email"
                                type="text"
                                value={userInfo?.email}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'email')}
                            />
                        </div>
                        <div className='form-row'>
                            <label> Password: </label>
                            <input
                                name="password"
                                id="password"
                                type="text"
                                value={userInfo?.password}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'password')}
                            />
                        </div>
                        <div className='form-row'>
                            <label> Phone Number: </label>
                            <input
                                name="phoneNumber"
                                id="phoneNumber"
                                type="text"
                                value={userInfo?.phoneNumber}
                                onChange={(e) => onUserInfoChange(e?.target?.value, 'phoneNumber')}
                            />
                        </div>
                        <div className='form-row'>
                            <button type="submit" className='submit-btn hcp'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}