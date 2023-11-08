import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../../services"
import './styles.css'


export function Login() {

    const [loginInfo, setLoginInfo] = useState<any>({})
    const navigate = useNavigate()


    function handleLoginInfoChange(data: any, field: any) {
        let workingObj = {...loginInfo}
        workingObj[field] = data
        setLoginInfo(workingObj)     
    }

    
    function dispatchLoginData(resp: any) {
        console.log('resp', resp)
		//store.dispatch(userActions.login(resp))
    }


    function onSubmitLogin(e : any) {
        e.preventDefault()
        userService.loginUser(loginInfo).then((resp: any) => {
			dispatchLoginData(resp.data)
			navigate('/dashboard')
        })
    }


    return (
        <div className="login-component">
            <div className="left-side">

            </div>
            <div className="right-side">
                <div className='login_access_panel'>
                    <form onSubmit={onSubmitLogin}>
                        <div className="form-row">
                            <input
                                name="username"
                                id="username"
                                type="text"
                                onChange={(e) => handleLoginInfoChange(e?.target?.value, 'username')}
                                className='mr-1'
                            >  
                            </input>
                        </div>
                        <div className="form-row">
                            <input
                                name="password"
                                id="password"
                                type="text"
                                onChange={(e) => handleLoginInfoChange(e?.target?.value, 'password')}
                                className='mr-1'
                            >
                            </input>
                        </div>
                        <div className="flex jc-sb">
                            <button className="hcp" type="submit">
                                Submit
                            </button>
                            <div>
                                <span className='forgot_password_text'>Forgot Password?</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}