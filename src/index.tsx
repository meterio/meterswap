import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import 'inter-ui'
import React, { StrictMode } from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { HashRouter } from 'react-router-dom'
import { NetworkContextName } from './constants'
import './i18n'
import App from './pages/App'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import UserUpdater from './state/user/updater'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme'
import getLibrary from './utils/getLibrary'
import { client } from './queries/client'
import { tclient } from './queries/thetaclient'





const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if ('ethereum' in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

const GOOGLE_ANALYTICS_ID: string | undefined = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID)
  ReactGA.set({
    customBrowserType: !isMobile ? 'desktop' : 'web3' in window || 'ethereum' in window ? 'mobileWeb3' : 'mobileRegular'
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}

window.addEventListener('error', error => {
  ReactGA.exception({
    description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
    fatal: true
  })
})

function Updaters() {
  return (
    <>
      {/*<ListsUpdater />*/}
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

function SwitchByNetwork () {
  let networkId = window.localStorage.getItem('chainId')

  if(!networkId){
return(
    <StrictMode>
    <FixedGlobalStyle />
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Updaters />
          <ThemeProvider>
            <ThemedGlobalStyle />
            <HashRouter>
              <App />
            </HashRouter>
          </ThemeProvider>
        </Provider>
        </ApolloProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </StrictMode>
)

  }

  if(networkId && networkId === '361') {

    return (
    <StrictMode>
    <FixedGlobalStyle />
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
      <ApolloProvider client={tclient}>
        <Provider store={store}>
          <Updaters />
          <ThemeProvider>
            <ThemedGlobalStyle />
            <HashRouter>
              <App />
            </HashRouter>
          </ThemeProvider>
        </Provider>
        </ApolloProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </StrictMode>
    )
  }

  return (
    <StrictMode>
    <FixedGlobalStyle />
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Updaters />
          <ThemeProvider>
            <ThemedGlobalStyle />
            <HashRouter>
              <App />
            </HashRouter>
          </ThemeProvider>
        </Provider>
        </ApolloProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </StrictMode>
  )
}

ReactDOM.render(
  <SwitchByNetwork/>
,
  document.getElementById('root')
)
