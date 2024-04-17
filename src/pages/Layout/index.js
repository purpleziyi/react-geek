import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate } from 'react-router-dom'

const { Header, Sider } = Layout

const items = [
    {
        label: 'Home',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: 'Article Management',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: 'Article Creation',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate() //用于跳转页面
    const onMenuClik = (route) => {
        console.log("menu is clicked", route);
        const path = route.key
        navigate(path)  // 将path作为路径参数放入可以navigate函数中
    }
    return (
        <Layout>
            <Header className="header">

                <div className="user-info">
                    <span className="user-name">purpleZiyi</span>
                    <span className="user-logout">
                        <Popconfirm title="Confirm to logout?？" okText="logout" cancelText="cancell">
                            <LogoutOutlined /> Logout
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        onClick={onMenuClik}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    {/* 二级路由出口：当二级路匹配时，渲染该二级路由组件的位置就在此出口处*/}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout