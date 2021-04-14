import { Route } from "react-router-dom";
import App from '../pages/App.js'

// v8
import HelloWorld from '../pages/HelloWorld.js'

function MainContent () {
  return(
    <div style={{flex: 1, margin: 'auto', padding: '30px'}}>
      <Route exact path="/" component={App} />
      <Route path="/v8-HelloWorld" component={HelloWorld} />
      {/* <Route path="/contact" component={Contact} /> */}
    </div>
  )
}
export default MainContent;