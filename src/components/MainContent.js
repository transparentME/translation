import { Route } from "react-router-dom";
import App from '../pages/App.js'

// v8
import HelloWorld from '../pages/HelloWorld.js'
import FastPropertiesInV8 from '../pages/FastPropertiesInV8/FastPropertiesInV8.js'
import DiggingIntoTheTurboFanJIT from '../pages/DiggingIntoTheTurboFanJIT/DiggingIntoTheTurboFanJIT.js'
import V8ReleaseV4_5 from '../pages/V8ReleaseV4.5/V8ReleaseV4_5.js'

// leetcode
import Offer15 from '../pages/leetcode/Offer15.js'
import Offer17 from '../pages/leetcode/Offer17.js'

function MainContent () {
  return(
    <div style={{flex: 1, margin: 'auto', padding: '30px', height: '100vh', overflow: 'scroll'}}>
      <Route exact path="/" component={App} />
      {/* v8 */}
      <Route path="/v8-HelloWorld" component={HelloWorld} />
      <Route path="/v8-FastPropertiesInV8" component={FastPropertiesInV8} />
      <Route path="/v8-DiggingIntoTheTurboFanJIT" component={DiggingIntoTheTurboFanJIT} />
      <Route path="/v8-V8ReleaseV4_5" component={V8ReleaseV4_5} />

      {/* leetcode */}
      <Route path="/leetcode-offer15" component={Offer15} />
      <Route path="/leetcode-offer17" component={Offer17} />

      {/* <Route path="/contact" component={Contact} /> */}
    </div>
  )
}
export default MainContent;