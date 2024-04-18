import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const { Option } = Select

const Publish = () => {
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Home</Link> },
                        { title: 'Publish Article' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1 }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the article title' }]}
                    >
                        <Input placeholder="Please enter the article title" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Channel"
                        name="channel_id"
                        rules={[{ required: true, message: 'Please select an article channel' }]}
                    >
                        <Select placeholder="Please select an article channel" style={{ width: 400 }}>
                            <Option value={0}>recommend</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="centent"
                        name="content"
                        rules={[{ required: true, message: 'Please enter the article content' }]}
                    >
                        {/* 富文本编辑器 */}
                        <ReactQuill
                            className="publish-quill"   // 为了更改富文本的高度，所以增加一个className，以便在scss文件中定义高度
                            theme="snow"
                            placeholder="Please enter the article content"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                Publish Article
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish