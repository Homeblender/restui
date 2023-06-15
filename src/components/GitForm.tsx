import React, {useState} from 'react';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Divider, Form, Input, Modal} from 'antd';
import axios from "axios";


interface IGitFormData {
    githubAuthToken?: string;
    gitlabAuthToken?: string;
    githubUrls: string[];
    gitlabUrls: string[];
}


const App: React.FC = () => {
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gitlabSuccess, setGitlabSuccess] = useState<string[]>([]);
    const [githubSuccess, setGithubSuccess] = useState<string[]>([]);
    const [gitlabFailure, setGitlabFailure] = useState<string[]>([]);
    const [githubFailure, setGithubFailure] = useState<string[]>([]);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values: IGitFormData) => {


        axios({
            method: 'post',
            url: "http://localhost:8080/api/repositories",
            headers: {
                "Content-type": "application/json",
                "githubAuthToken": String(values.githubAuthToken),
                "gitlabAuthToken": String(values.gitlabAuthToken),
            },
            data: {
                gitlab: values.gitlabUrls, // This is the body part
                github: values.githubUrls, // This is the body part
            }
        }).then((response) => {
            setGitlabSuccess(response.data.gitlab.success)
            setGithubSuccess(response.data.github.success)
            setGithubFailure(response.data.github.failure)
            setGitlabFailure(response.data.gitlab.failure)
            console.log(response.data.gitlab);
            showModal();
        });

    };


    return (
        <Card title={"Добавление новых репозиториев"}>
            <Form
                id={"form"}
                name="dynamic_form_item"
                className="dynamic_form_item"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item id={"githubAuthToken"} validateTrigger={['onChange', 'onBlur']} name="githubAuthToken">
                    <Input placeholder="Github auth token" style={{width: '75%'}}/>
                </Form.Item>

                <Form.Item id={"gitlabAuthToken"} validateTrigger={['onChange', 'onBlur']} name="gitlabAuthToken">
                    <Input placeholder="Gitlab auth token" style={{width: '75%'}}/>
                </Form.Item>

                <Form.List name="githubUrls">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map((field) => (
                                <Form.Item key={field.key}>
                                    <Form.Item {...field} noStyle>
                                        <Input required={true} placeholder="github url"
                                               style={{width: '50%', marginLeft: '9%'}}/>
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                        style={{width: '5%'}}
                                    />
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined/>}
                                    className="add-button"
                                >
                                    Добавить ссылку GitHub
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.List name="gitlabUrls">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map((field) => (
                                <Form.Item>
                                    <Form.Item {...field} noStyle>
                                        <Input required={true} placeholder="gitlab url"
                                               style={{width: '50%', marginLeft: '9%'}}/>
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                        style={{width: '5%'}}
                                    />
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    className="add-button"
                                    icon={<PlusOutlined/>}
                                >
                                    Добавить ссылку GitLab
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="submit-button">
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
            <Modal title="Результат" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Divider style={{fontSize: "25px"}}>GitHub</Divider>
                <Divider style={{fontSize: "18px"}}>Успешно:</Divider>
                <ul>
                    {githubSuccess.map((note) => <li><a href={note} target={"_blank"}>{note}</a></li>)}
                </ul>
                <Divider style={{fontSize: "18px"}}>Безуспешно:</Divider>
                <ul>
                    {githubFailure.map((note) => <li><a href={note} target={"_blank"}>{note}</a></li>)}
                </ul>

                <Divider style={{fontSize: "25px"}}>Gitlab</Divider>
                <Divider style={{fontSize: "18px"}}>Успешно:</Divider>
                <ul>
                    {gitlabSuccess.map((note) => <li><a href={note} target={"_blank"}>{note}</a></li>)}
                </ul>
                <Divider style={{fontSize: "18px"}}>Безуспешно:</Divider>
                <ul>
                    {gitlabFailure.map((note) => <li><a href={note} target={"_blank"}>{note}</a></li>)}
                </ul>
            </Modal>
        </Card>

    );
};

export default App;

