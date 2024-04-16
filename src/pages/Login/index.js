import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values);
        // trigger async action : fetchLogin
        await dispatch(fetchLogin(values))  // make sure that dispatch-function is completed then jump
        // 1. Jump to home page
        navigate('/')
        // reminder user
        message.success("login successful")

    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="mobile"
                        //Multiple verification logic. Verify the 1st firstly, then verify 2nd one after 1st one passes.
                        rules={[
                            {
                                required: true,
                                message: 'Please enter mobilephone number!',
                            },
                            {
                                pattern: /\d{11}$/,
                                message: 'Please enter the correct mobile phone number format'
                            },
                        ]}>
                        <Input size="large" placeholder="Please enter mobilephone number" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'please enter verification code!',
                            },
                        ]}>
                        <Input size="large" placeholder="please enter verification code" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login