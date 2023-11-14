import { ObjectID } from "bson";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services";
import { User } from "../../types";
import './styles.css'
import { Button, Input , Form} from "antd";



export default function SignUp() {
    
    const [userInfo, setUserInfo] = useState<any>({})
    const navigate = useNavigate();


    function onUserInfoChange(value: any, field: any) {
        let workingObj = userInfo;
        workingObj[field] = value
        setUserInfo(workingObj)
    }

    function onFinish(data: any) {

        const user_to_add_obj = {
            'id': new ObjectID().toString(),
            'firstName': data?.firstName,
            'lastOrBusinessName': data?.lastOrBusinessName,
            'receiveToEmail': data?.email,
            'sendFromEmail': '',
            'sendFromEmailPassword': '',
            'receiveToPhone': '',
            'sendFromPhone': '',
            'password': data?.password,
            'role': 'user',
        }

        let to_add : User  = JSON.parse(JSON.stringify(user_to_add_obj));
  
        userService.createNewUser(to_add).then((resp: any) => {

            if (resp?.status === 200) {
                navigate('/welcome')
                setTimeout(() => navigate('/login'), 3000);

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
                    <Form.Item name="firstName" rules={[{ required: false }]} className="signup-form-item">
                        <Input
                            placeholder="First Name"
                            className="signup-field"
                            onChange={(e) => onUserInfoChange(e?.target?.value, 'firstName')}
                        />
                    </Form.Item>
                    <Form.Item name="lastOrBusinessName" rules={[{ required: true }]} className="signup-form-item">
                        <Input
                            placeholder="Last or Business Name"
                            className="signup-field"
                            onChange={(e) => onUserInfoChange(e?.target?.value, 'lastOrBusinessName')}
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
                    <div className="signup-btn-container">
                        <Button
                            className="signup-btn"
                            htmlType="submit"
                        >
                            Sign up
                        </Button>
                    </div>
                    <div className="have-an-acct-row">
                        <span className="have-an-acct-row-text">
                            Already have an account?
                        </span>
                        <span 
                            className="login-text"
                            onClick={() => navigate('/login')}
                        >
                            Log in.
                        </span>
                    </div>
                    <div className="terms-text-row">
                        <span className="terms-text">
                            By creating an account, you agree to our <br/>
                            <span className="p-policy-text">Privacy Policy</span> and <span className="tou-text">Terms of Use</span>.
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    )
}