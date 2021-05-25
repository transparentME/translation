import { Route } from "react-router-dom";
import App from '../pages/App.js'

// v8
// home
import HelloWorld from '../pages/V8/Home/HelloWorld.js'
// blog
import FastPropertiesInV8 from '../pages/V8/Blog/FastPropertiesInV8/FastPropertiesInV8.js'
import DiggingIntoTheTurboFanJIT from '../pages/V8/Blog/DiggingIntoTheTurboFanJIT/DiggingIntoTheTurboFanJIT.js'
import V8ReleaseV4_5 from '../pages/V8/Blog/V8ReleaseV4.5/V8ReleaseV4_5.js'
import CodeCache from '../pages/V8/Blog/CodeCache/CodeCache.js'
import GettingGarbageCollectionForFree from '../pages/V8/Blog/GettingGarbageCollectionForFree/GettingGarbageCollectionForFree.js'
import V8ReleaseV9_0 from '../pages/V8/Blog/V8ReleaseV9_0/V8ReleaseV9_0.jsx'
import V8ReleaseV9_1 from '../pages/V8/Blog/V8ReleaseV9_1/V8ReleaseV9_1.js'
import ShortBuiltIns from '../pages/V8/Blog/ShortBuiltIns/ShortBuiltIns.jsx'
// docs
// research
import Research from '../pages/V8/Research/Research.js'

//babel
// Guides
import WhatIsBabel from '../pages/Babel/Guides/WhatIsBabel/WhatIsBabel.jsx'
import UsageGuide from '../pages/Babel/Guides/UsageGuide/UsageGuide.jsx'
import ConfigureBabel from '../pages/Babel/Guides/ConfigureBabel/ConfigureBabel.jsx'

// General
import Editors from '../pages/Babel/General/Editors/Editors.jsx'
import Plugins from '../pages/Babel/General/Plugins/Plugins.jsx'
import Presets from '../pages/Babel/General/Presets/Presets.jsx'


// leetcode
import Offer15 from '../pages/leetcode/Offer15.js'
import Offer17 from '../pages/leetcode/Offer17.js'

function MainContent () {
  return(
    <div style={{flex: 1, margin: 'auto', padding: '30px', height: '100vh', overflow: 'scroll'}}>
      <Route exact path="/" component={App} />
      {/* v8 */}
      {/* home */}
      <Route path="/v8-HelloWorld" component={HelloWorld} />
      {/* docs */}
      <Route path="/v8-FastPropertiesInV8" component={FastPropertiesInV8} />
      <Route path="/v8-DiggingIntoTheTurboFanJIT" component={DiggingIntoTheTurboFanJIT} />
      <Route path="/v8-V8ReleaseV4_5" component={V8ReleaseV4_5} />
      <Route path="/v8-CodeCache" component={CodeCache} />
      <Route path="/v8-GettingGarbageCollectionForFree" component={GettingGarbageCollectionForFree} />
      <Route path="/v8-V8ReleaseV9_0" component={V8ReleaseV9_0} />
      <Route path="/v8-V8ReleaseV9_1" component={V8ReleaseV9_1} />
      <Route path="/v8-ShortBuiltIns" component={ShortBuiltIns} />

      {/* research */}
      <Route path="/v8-Research" component={Research} />

      {/* babel */}
      {/* Guides */}
      <Route path="/babel-WhatIsBabel" component={WhatIsBabel} />
      <Route path="/babel-UsageGuide" component={UsageGuide} />
      <Route path="/babel-ConfigureBabel" component={ConfigureBabel} />

      {/* General */}
      <Route path="/babel-Editors" component={Editors} />
      <Route path="/babel-Plugins" component={Plugins} />
      <Route path="/babel-Presets" component={Presets} />

      {/* leetcode */}
      <Route path="/leetcode-offer15" component={Offer15} />
      <Route path="/leetcode-offer17" component={Offer17} />

      {/* <Route path="/contact" component={Contact} /> */}
    </div>
  )
}
export default MainContent;