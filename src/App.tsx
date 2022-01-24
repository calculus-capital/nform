import React from 'react'
import './App.css'
import "@fontsource/fira-sans"

import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import "./login.css"

import Everything from './containers/everything'

import awsExports from './aws-exports';
Amplify.configure(awsExports)


function App() {
  return (
    <div className="App">
      <div className="appContent">
        <Everything></Everything>
      </div>
    </div>
  )
}

// export default App
export default withAuthenticator(App)
