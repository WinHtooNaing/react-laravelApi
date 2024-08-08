import { Button, Form, Input, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [form] = Form.useForm();

    const getPost = async () => {
        const response = await fetch(`/api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();

        if (!response.ok) {
            navigate("/");
        }
        if (data.post.user_id !== user.id) {
            message.error("You are not own post to edit this post.");
            navigate("/");
        }
        setPost(data.post);
    };

    useEffect(() => {
        getPost();
    }, [user]);

    useEffect(() => {
        if (post) {
            form.setFieldsValue({
                title: post.title,
                body: post.body,
            });
        }
    }, [post, form]);

    const onFinish = async (values) => {
        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
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
                    Edit Page
                </h1>
                <Form
                    form={form}
                    name="update"
                    initialValues={{
                        remember: true,
                        title: post?.title || "",
                        body: post?.body || "",
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
                                message: "Please input your Title!",
                            },
                            {
                                min: 3,
                                message: "Min  3 characters required!",
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
                                message: "Please input your Description!",
                            },
                            {
                                min: 10,
                                message: "Min 10 characters required!",
                            },
                        ]}
                    >
                        <Input.TextArea type="text" placeholder="Description" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

export default Update;
