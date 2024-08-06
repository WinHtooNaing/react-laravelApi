import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);
    const onFinish = async (values) => {
        const response = await fetch("/api/login", {
            method: "post",
            body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.status !== 200) {
            message.error(data.message);
        } else {
            message.success(data.message);
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/");
        }
    };
    return (
        <section className="w-full flex justify-center mt-20">
            <div className="w-1/3 max-sm:w-2/3">
                <h1 className="text-2xl text-center mb-10 font-mono font-bold">
                    Login
                </h1>
                <Form
                    name="login"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 360,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        <p className="text-center">or</p>
                        <Link to={"/register"} className="flex justify-center">
                            Register now!
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

export default Login;
