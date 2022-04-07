import * as React from "react"

import { Form, Input, Button } from 'antd';
import {IArticle} from "../type";


type Props = {
    saveArticle: (article: IArticle | any) => void
}

export const AddArticle: React.FC<Props> = ({ saveArticle }) => {
    const [article, setArticle] = React.useState<IArticle | {}>()

    const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
        setArticle({
            ...article,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    const onFinish = (values: any) => {
        saveArticle(article)
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={() => alert("ERROR!")}
            autoComplete="off"
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input a title!' }]}
            >
                <Input id="title" onChange={handleArticleData} />
            </Form.Item>

            <Form.Item
                label="Description"
                name="body"
                rules={[{ required: true, message: 'Description' }]}
            >
                <Input id="body" onChange={handleArticleData} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" disabled={article === undefined ? true : false}>
                    Add article
                </Button>
            </Form.Item>

        </Form>
    )
}