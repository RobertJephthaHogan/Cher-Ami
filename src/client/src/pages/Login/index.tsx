import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../../services"
import './styles.css'
import { Button, Form, Input } from "antd"


export function Login() {

    const [loginInfo, setLoginInfo] = useState<any>({})
    const navigate = useNavigate()

    
    function onFinish(data : any) {
        console.log('data', data)
        userService.loginUser(data)
            .then((resp: any) => {
                //store.dispatch(userActions.login(resp?.data))
                //navigate('/dashboard')
            })
            .catch((er: any) => {
                console.error('Error logging in user', er)
            })
    }


    return (
        <div className="login-component">
            <div className="login-content">
                <div className="login-content-title-wrapper">
                    <span className="login-content-title">Log in</span>
                </div>
                <Form 
                    onFinish={onFinish}
                >
                    <div>
                        <Form.Item name="username" rules={[{ required: true }]} className="login-form-item">
                            <Input
                                placeholder="Email Address"
                                className="login-email-field"
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="password" rules={[{ required: true }]} className="login-form-item">
                            <Input
                                placeholder="Password"
                                className="login-password-field"
                            />
                        </Form.Item>
                    </div>
                    <div className="login-btn-container">
                        <Button
                            className="login-btn"
                            htmlType="submit"
                        >
                            Login
                        </Button>
                    </div>
                    <div className="forgot-password-text-row">
                        <span className="forgot-password-text">
                            Forgot Password?
                        </span>
                    </div>
                    <div className="sign-up-text-row">
                        <span className="dont-have-acct-text">
                            Don't have an account?
                        </span>
                        <span 
                            className="sign-up-text"
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    )
}