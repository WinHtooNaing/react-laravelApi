import { Button, Form, Input, message } from "antd";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Create = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const onFinish = async (values) => {
        const response = await fetch("/api/posts", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            message.success(data.message);
            navigate("/");
        }
    };
    return (
        <section className="w-full flex justify-center mt-16">
            <div className="w-1/3 max-sm:w-2/3">
                <h1 className="text-3xl text-center mb-10 font-mono font-bold text-blue-500">
                    Create Page
                </h1>
                <Form
                    name="create"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 400,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                            {
                                min: 3,
                                message: "Min  3",
                            },
                        ]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                        name="body"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Desciption!",
                            },
                            {
                                min: 10,
                                message: "Min 10",
                            },
                        ]}
                    >
                        <Input.TextArea type="text" placeholder="Description" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

export default Create;
