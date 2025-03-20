import React,{useState} from 'react'
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusSquareOutlined,
    UserOutlined,
    LogoutOutlined,
    QuestionOutlined,
    PieChartOutlined,
  } from "@ant-design/icons";
  import { Button, Menu } from "antd";
const items = [
  {
    key: "1",
    icon: <PlusSquareOutlined />,
    label: <a href="/Posts">Posts</a>,
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: <a href="/more">Cat Facts</a>,
  },
  {
    key: "3",
    icon: <QuestionOutlined />,
    label: <a href="/about">About Us</a>,
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: <a href="/userinfo">User Info</a>,
  },
  {
    key: "5",
    icon: <LogoutOutlined />,
    label: "Log Out",
  },
];

  
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
      const toggleCollapsed = () => {
        setCollapsed(!collapsed);
      };
  return (
    <div>
      
  <div
        style={{
          width: "250px",
          height: "100%",
          backgroundColor: "pink",
          position: "fixed",
          left: "0px",
          top: "0px",
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
            display: "flex",
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
        <div
          style={{
            width: "100px",
            position: "relative",

            left: "30%",
          }}
        >
        </div>
      </div>
    </div>
  )
}

export default Sidebar
