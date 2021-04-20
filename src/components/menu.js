import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

import {
  AppstoreOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

class MainMenu extends React.Component {
  render() {
    return (
      <div style={{ width: 256, height: '100vh', background: 'black' }}>
        <Menu
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="mainPage">
            <Link to="/">首页</Link>
          </Menu.Item>
          <SubMenu key="translation" title="翻译">
            <SubMenu key="v8" icon={<AppstoreOutlined />} title="v8">
              <SubMenu key="Blog" title="Blog">
                <Menu.Item key="HelloWorld">
                  <Link to="/v8-HelloWorld">HelloWorld</Link>
                </Menu.Item>
                <Menu.Item key="FastPropertiesInV8">
                  <Link to="/v8-FastPropertiesInV8">FastPropertiesInV8</Link>
                </Menu.Item>
                <Menu.Item key="DiggingIntoTheTurboFanJIT">
                  <Link to="/v8-DiggingIntoTheTurboFanJIT">DiggingIntoTheTurboFanJIT</Link>
                </Menu.Item>
                <Menu.Item key="V8ReleaseV4_5">
                  <Link to="/v8-V8ReleaseV4_5">V8ReleaseV4_5</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Docs" title="Docs">
                <Menu.Item key="Object rest and spread properties">Object rest and spread properties</Menu.Item>
              </SubMenu>
              <SubMenu key="js/wasm" title="js/wasm">
                <Menu.Item key="Object rest and spread properties">Object rest and spread properties</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Babel">
              <Menu.Item key="5">
                <Link to="/Babel-Guides">Guides</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/Babel-General">General</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="parsingTech" icon={<AppstoreOutlined />} title="parsingTech">
              <Menu.Item key="5">
                <Link to="/Babel-Guides">Guides</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="components" title="组件库">
            <Menu.Item key="bud-mobile">
              <Link to="/bud-mobile">移动端</Link>
            </Menu.Item>
            <Menu.Item key="bud">
              <Link to="/bud">pc端</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="leetcode" title="算法">
            <Menu.Item key="Offer15">
              <Link to="/leetcode-offer15">Offer15</Link>
            </Menu.Item>
            <Menu.Item key="Offer17">
              <Link to="/leetcode-offer17">Offer17</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default MainMenu;