import { Route } from "react-router-dom";
import App from '../pages/App.js'

// v8
import HelloWorld from '../pages/HelloWorld.js'
import FastPropertiesInV8 from '../pages/FastPropertiesInV8/FastPropertiesInV8.js'

// leetcode
import Offer15 from '../pages/leetcode/Offer15.js'

function MainContent () {
  return(
    <div style={{flex: 1, margin: 'auto', padding: '30px', height: '100vh', overflow: 'scroll'}}>
      <Route exact path="/" component={App} />
      {/* v8 */}
      <Route path="/v8-HelloWorld" component={HelloWorld} />
      <Route path="/v8-FastPropertiesInV8" component={FastPropertiesInV8} />
      {/* leetcode */}
      <Route path="/leetcode-offer15" component={Offer15} />

      {/* <Route path="/contact" component={Contact} /> */}
    </div>
  )
}
export default MainContent;