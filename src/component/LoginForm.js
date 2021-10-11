import React, {Component} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "../utils"; // 从上一层utils 调用login 方法。

class LoginForm extends Component {
    state = {
        loading: false
    }

    onFinish = (values) => {// 类组键， 不需要const
        // step 1: set loading true;
        // step 2: send login request to the server
        // step 3: inform APP if login fail or success (deal with login status)
        // step 4: if failed, set loading to false again in finally (roll back)
        this.setState({loading: true});

        console.log('Received values of form: ', values);

        login(values) // login 方法发送数据。
            .then( () => {
                // show login success;
                message.success(`Login Successful`);
                this.props.onSuccess();
            })
            .catch( err => {
                // show err
                message.error(err.message);
            })
            .finally( () => {
                //set loading back to false;
                this.setState({loading: false})
            })
    };

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                // initialValues={{
                //     remember: true,
                // }}
                onFinish={this.onFinish} // 类组键 需要用this.
                style={{
                    width: 300,
                    margin: "auto",
                }}
            >
                <Form.Item
                    name="username" // 收集数据之后 该数据对应的变量名
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                            loading={this.state.loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;