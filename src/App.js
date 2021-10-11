// import logo from './logo.svg'; //delete origin code
import React, {useState} from "react";
import './App.css';
import { Layout, Typography } from "antd"; //从antd 引入变量。
import LoginForm from "./component/LoginForm"; // 从LoginForm.js 引入 方法。
import FoodList from "./component/FoodList";
import MyCart from "./component/MyCart";

const { Header, Content } = Layout;
const { Title } = Typography;
function App() {

    // 定义一个状态， 来记录 LoginForm 中的 loading states 对应的响应
    const [authed, setAuthed] = useState(false); // useState 初始化变量和修改变量的函数

    return (
        <Layout style={{ height: "100vh" }}>

          <Header>
              <div className={"header"}
                   style={{display: "flex", justifyContent: "space-between"}}
              >
                <Title
                    level = {2}
                    style = {{color : "white", lineHeight: "inherit", marginBottom : 0}}
                >
                    LaiFood
                </Title>
                  {
                      authed && (
                          <div>
                              <MyCart />
                          </div>
                      )
                  }
              </div>
          </Header>
          <Content
              style={{
                padding: "50px",
                maxHeight: "calc(100% - 64px)",
                overflowY: "auto",
          }}
          >
              {
                  authed
                      ?
                      <FoodList />
                      :
                      <LoginForm onSuccess={() => {setAuthed(true)}}/>
              }
          </Content>

        </Layout>

    )

}

export default App;
