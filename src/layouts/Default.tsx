/* eslint-disable no-restricted-imports */
import { NetworkProvider } from '@contexts/NetworkContext'
import { StoreProvider } from '@contexts/StoreProvider'
import { WhaleProvider } from '@contexts/WhaleContext'
import { StatsProvider } from '@store/stats'
import Head from 'next/head'
import { PropsWithChildren, useEffect, useState } from 'react'
import { ScanAppProps } from '../pages/_app.page'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PoolPairsProvider } from '@store/poolpairs'
import { SupplyProvider } from '@store/supply'
import { getInitialTheme, ThemeProvider } from '@contexts/ThemeContext'

const title = 'DeFiChain Blockchain Explorer – Native Decentralized Finance for Bitcoin'
const description = 'A community driven Blockchain Explorer for DeFiChain ($DFI), enabling decentralized finance with Bitcoin-grade security, strength and immutability. Powered by Sternberg Partners.'

/**
 * Default Layout with <Head> providing default Metadata for SEO
 *
 * Wrapped in <NetworkProvider> intercept network params from querystring.
 * Followed by <PlaygroundProvider> to automatically swatch between local and remote playground for debug environment.
 * Finally with <WhaleProvider> to provide WhaleContext for accessing of WhaleAPI and WhaleRPC.
 */
export function Default (props: PropsWithChildren<ScanAppProps>): JSX.Element | null {
  const initialTheme = getInitialTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // to prevent flashes due to different color theme on user device when react hydration happens in client side
    return <></>
  }

  return (
    <div className='flex flex-col min-h-screen dark:bg-gray-900'>
      <Head>
        <meta charSet='UTF-8' />
        <title key='title'>{title}</title>
        <meta key='description' name='description' content={description} />
        <meta key='robots' name='robots' content='follow,index' />
        <meta key='viewport' name='viewport' content='user-scalable=no, width=device-width, initial-scale=1' />
        <meta key='apple-mobile-web-app-capable' name='apple-mobile-web-app-capable' content='yes' />

        <meta key='og:locale' name='og:locale' content='en_US' />
        <meta key='og:title' name='og:title' content={title} />
        <meta key='og:site_name' name='og:site_name' content={title} />
        <meta key='og:description' name='og:description' content={description} />

        <link rel='icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='48x48' href='/favicon.png' />
      </Head>

      <NetworkProvider>
        <WhaleProvider>
          <StoreProvider state={props.initialReduxState}>
            <StatsProvider>
              <SupplyProvider>
                <PoolPairsProvider>
                  <ThemeProvider theme={initialTheme}>
                    <Header />
                    <main className='flex-grow'>
                      {props.children}
                    </main>
                    <Footer />
                  </ThemeProvider>
                </PoolPairsProvider>
              </SupplyProvider>
            </StatsProvider>
          </StoreProvider>
        </WhaleProvider>
      </NetworkProvider>
    </div>
  )
}
