import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Register = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const onFinish = async (values) => {
        const response = await fetch("/api/register", {
            method: "post",
            body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.errors) {
            setErrors(data.errors);
            if (errors.password) {
                message.error(errors.password);
            }
            if (errors.email) {
                message.error(errors.email);
            }
        } else {
            message.success(data.message);
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/");
        }
    };
    return (
        <section className="w-full flex justify-center mt-14">
            <div className="w-1/3 max-sm:w-2/3">
                <h1 className="text-2xl text-center mb-10 font-mono font-bold">
                    Register
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
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Username"
                        />
                    </Form.Item>
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
                    <Form.Item
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm  your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Register
                        </Button>
                        <p className="text-center">or</p>
                        <Link
                            to={"/login"}
                            className="flex justify-center text-blue-500 "
                        >
                            Login now!
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

export default Register;
