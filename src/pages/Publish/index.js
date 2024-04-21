import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
    // 获取频道列表
    const { channelList } = useChannel()

    // submit-form
    const onFinish = (formValue) => {
        console.log(formValue)
        // 校验封面类型imageType是否和实际的图片列表imageList数量是相等的
        if (imageList.length !== imageType) return message.warning('Cover type and number of images do not match配')
        const { title, content, channel_id } = formValue
        // 1. 按照接口文档的格式处理收集到的表单数据
        const reqData = {
            title,
            content,
            cover: {
                type: imageType, // 封面模式
                // 这里的url处理逻辑只是在新增时候的逻辑
                // 编辑的时候需要另做处理
                images: imageList.map(item => {    // 图片列表
                    if (item.response) {
                        return item.response.data.url // 有response字段的话就在response下面寻找
                    } else {
                        return item.url   // 没有response时就在0和1的情况下寻找
                    }
                }) // 图片列表
            },
            channel_id
        }
        // 2. 调用接口提交
        // 处理调用不同的接口 新增 （没有id）- 新增接口  编辑状态（有id） - 更新接口 
        if (articleId) {    // if id exists
            // 更新接口
            updateArticleAPI({ ...reqData, id: articleId })
        } else {
            createArticleAPI(reqData)
        }
    }

    // 上传回调
    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        console.log('loading up...', value)
        setImageList(value.fileList)
    }

    // 切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        console.log('切换封面了', e.target.value)
        setImageType(e.target.value)  //实现状态影响视图的变化
    }

    // 回填数据
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    // 获取实例
    const [form] = Form.useForm()
    useEffect(() => {
        // 1. 通过id获取数据
        async function getArticleDetail() {
            const res = await getArticleById(articleId)
            const data = res.data
            const { cover } = data
            form.setFieldsValue({
                ...data,
                type: cover.type
            })
            // 为什么现在的写法无法回填封面？
            // 数据结构的问题  set方法 -> { type: 3 }   { cover: { type: 3}}

            // 回填图片列表
            setImageType(cover.type)
            // 显示图片({url:url})
            setImageList(cover.images.map(url => {
                return { url }
            }))
        }
        // 只有有id的时候才能调用此函数回填
        if (articleId) {   // 根据是否有id来做适配
            getArticleDetail()
        }
        // 2. 调用实例方法 完成回填
    }, [articleId, form])


    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Home</Link> },
                        { title: `${articleId ? 'Edit' : 'Public'} Article` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}  //控制整个表单区域的初始值
                    onFinish={onFinish}
                    form={form}
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
                            {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Cover">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>single picture</Radio>
                                <Radio value={3}>three pictures</Radio>
                                <Radio value={0}>no picture</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* 
                            listType: 决定选择文件框的外观样式
                            showUploadList: 控制显示上传列表
                        */}
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            onChange={onChange}
                            maxCount={imageType}  // 限制上传的图片数量的上限
                            fileList={imageList}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
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