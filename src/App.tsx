import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Balance } from './components/Balance'
import { SendTransaction } from './components/SendTransaction'

export const App = () => {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>Frontend Task</h1>
      <ConnectButton />
      {isConnected && (
        <>
          <h2>Send Transaction</h2>
          <SendTransaction />
          <br />
          <Balance />
          <br />
          <hr />
        </>
      )}
    </>
  )
}
