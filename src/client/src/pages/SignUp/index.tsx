import { ObjectID } from "bson";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services";
import { User } from "../../types";
import './styles.css'
import { Button, Input , Form} from "antd";



export function SignUp() {
    
    const [userInfo, setUserInfo] = useState<any>({})
    const navigate = useNavigate();


    function onUserInfoChange(value: any, field: any) {
        let workingObj = userInfo;
        workingObj[field] = value
        setUserInfo(workingObj)
        console.log('workingObj', workingObj)
    }

    function navigateTo(to: any) {
        navigate(to)
    }

    function onFinish(data: any) {
        console.log('data', data)

        const user_to_add_obj = {
            'id': new ObjectID().toString(),
            'firstName': data?.firstName,
            'lastName': data?.lastName,
            'email': data?.email,
            'password': data?.password,
            'role': 'user',
        }

        let to_add : User  = JSON.parse(JSON.stringify(user_to_add_obj));
  
        console.log('to_add', to_add)

        userService.createNewUser(to_add).then((resp: any) => {
            console.log('resp', resp)

            if (resp?.status === 200) {
                
                console.log('success!')
                navigate('/welcome')
                setTimeout(() => navigateTo('/'), 3000);

            } else {
                console.log('error creating new user!')
            }

            //navigate('/login')
        })

    }


    return (
        <div className='signup-component'>
            <div className="signup-content">

                <div className="signup-content-title-wrapper">
                    <span className="signup-content-title">Sign Up</span>
                </div>

                <Form 
                    className="signup-form"
                    onFinish={onFinish}
                >
                    <Form.Item name="firstName" rules={[{ required: true }]} className="signup-form-item">
                        <Input
                            placeholder="First Name"
                            className="signup-field"
                            onChange={(e) => onUserInfoChange(e?.target?.value, 'firstName')}
                        />
                    </Form.Item>
                    <Form.Item name="lastName" rules={[{ required: true }]} className="signup-form-item">
                        <Input
                            placeholder="Last Name"
                            className="signup-field"
                            onChange={(e) => onUserInfoChange(e?.target?.value, 'lastName')}
                        />
                    </Form.Item>
                    <Form.Item name="email" rules={[{ required: true }]} className="signup-form-item">
                        <Input
                            placeholder="Email Address"
                            className="signup-field"
                            onChange={(e) => onUserInfoChange(e?.target?.value, 'email')}
                        />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true }]} className="signup-form-item">
                        <Input
                            placeholder="Password"
                            className="signup-field"
                            onChange={(e) => onUserInfoChange(e?.target?.value, 'password')}
                        />
                    </Form.Item>
                    <Form.Item 
                        name="confirmPassword" 
                        rules={[
                            {
                              required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                          ]}
                        dependencies={['password']} 
                        className="signup-form-item"
                    >
                        <Input
                            placeholder="Confirm Password"
                            className="signup-field"
                            onChange={(e) => onUserInfoChange(e?.target?.value, 'confirmPassword')}
                        />
                    </Form.Item>
                    <div>
                        <span className="terms-text">
                            By creating an account, you agree to our <br/>
                            Privacy Policy and Terms of Use.
                        </span>
                    </div>
                    <div className="signup-btn-container">
                        <Button
                            className="signup-btn"
                            htmlType="submit"
                        >
                            Sign up
                        </Button>
                    </div>
                </Form>
                
            </div>
        </div>
    )
}