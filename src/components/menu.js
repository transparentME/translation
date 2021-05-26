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
      <div style={{ width: 256, height: '100vh', background: 'black', overflow: 'scroll' }}>
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
                <Menu.Item key="CodeCache">
                  <Link to="/v8-CodeCache">CodeCache</Link>
                </Menu.Item>
                <Menu.Item key="GettingGarbageCollectionForFree">
                  <Link to="/v8-GettingGarbageCollectionForFree">GettingGarbageCollectionForFree</Link>
                </Menu.Item>
                <Menu.Item key="V8ReleaseV9_0">
                  <Link to="/v8-V8ReleaseV9_0">V8ReleaseV9_0</Link>
                </Menu.Item>
                <Menu.Item key="V8ReleaseV9_1">
                  <Link to="/v8-V8ReleaseV9_1">V8ReleaseV9_1</Link>
                </Menu.Item>
                <Menu.Item key="ShortBuiltIns">
                  <Link to="/v8-ShortBuiltIns">ShortBuiltIns</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Docs" title="Docs">
              </SubMenu>
              <SubMenu key="js/wasm" title="js/wasm">
              </SubMenu>
              <SubMenu key="research" title="Research">
                <Menu.Item key="Research">
                  <Link to="/v8-Research">Research</Link>
                </Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="Babel" icon={<AppstoreOutlined />} title="Babel">
              <SubMenu key="Babel-Guides" title="Babel-Guides">
                <Menu.Item key="WhatIsBabel">
                  <Link to="/Babel-WhatIsBabel">What is Babel</Link>
                </Menu.Item>
                <Menu.Item key="UsageGuide">
                  <Link to="/Babel-UsageGuide">Usage Guide</Link>
                </Menu.Item>
                <Menu.Item key="ConfigureBabel">
                  <Link to="/Babel-ConfigureBabel">Configure Babel</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Babel-General" title="Babel-General">
                <Menu.Item key="Editors">
                  <Link to="/Babel-Editors">Editors</Link>
                </Menu.Item>
                <Menu.Item key="Plugins">
                  <Link to="/Babel-Plugins">Plugins</Link>
                </Menu.Item>
                <Menu.Item key="Presets">
                  <Link to="/Babel-Presets">Presets</Link>
                </Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="parsingTech" icon={<AppstoreOutlined />} title="parsingTech">
              <Menu.Item key="Preface">
                <Link to="/ParsingTech-Preface">Preface</Link>
              </Menu.Item>
              <Menu.Item key="Introduction">
                <Link to="/ParsingTech-Introduction">Introduction</Link>
              </Menu.Item>
              <Menu.Item key="GrammarsAsAGeneratingDevice">
                <Link to="/ParsingTech-GrammarsAsAGeneratingDevice">GrammarsAsAGeneratingDevice</Link>
              </Menu.Item>
              <Menu.Item key="IntroductionToParsing">
                <Link to="/ParsingTech-IntroductionToParsing">IntroductionToParsing</Link>
              </Menu.Item>
              <Menu.Item key="GeneralNonDirectionalMethods">
                <Link to="/ParsingTech-GeneralNonDirectionalMethods">GeneralNonDirectionalMethods</Link>
              </Menu.Item>
              <Menu.Item key="RegularGrammarsAndfiniteStateAutomata">
                <Link to="/ParsingTech-RegularGrammarsAndfiniteStateAutomata">RegularGrammarsAndfiniteStateAutomata</Link>
              </Menu.Item>
              <Menu.Item key="GeneralDirectionalTopDownMethods">
                <Link to="/ParsingTech-GeneralDirectionalTopDownMethods">GeneralDirectionalTopDownMethods</Link>
              </Menu.Item>
              <Menu.Item key="GeneralBottomUpParsing">
                <Link to="/ParsingTech-GeneralBottomUpParsing">GeneralBottomUpParsing</Link>
              </Menu.Item>
              <Menu.Item key="DeterministicTopDownMethods">
                <Link to="/ParsingTech-DeterministicTopDownMethods">DeterministicTopDownMethods</Link>
              </Menu.Item>
              <Menu.Item key="DeterministicBottomUpParsing">
                <Link to="/ParsingTech-DeterministicBottomUpParsing">DeterministicBottomUpParsing</Link>
              </Menu.Item>
              <Menu.Item key="ErrorHandling">
                <Link to="/ParsingTech-ErrorHandling">ErrorHandling</Link>
              </Menu.Item>
              <Menu.Item key="ComparativeSurvey">
                <Link to="/ParsingTech-ComparativeSurvey">ComparativeSurvey</Link>
              </Menu.Item>
              <Menu.Item key="ASimpleGeneralContextFreeParser">
                <Link to="/ParsingTech-ASimpleGeneralContextFreeParser">ASimpleGeneralContextFreeParser</Link>
              </Menu.Item>
              <Menu.Item key="AnnotatedBibliography">
                <Link to="/ParsingTech-AnnotatedBibliography">AnnotatedBibliography</Link>
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