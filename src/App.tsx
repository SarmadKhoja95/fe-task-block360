import { ethers } from 'ethers'
import { useState } from 'react'
import { useSigner } from './hooks/useSigner'

export const App = () => {
  const { signer, balance, handleConnect } = useSigner()
  const [isPending, setPending] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')

  return (
    <>
      <h1>Frontend Task</h1>
      {!signer?.address ?
        <button onClick={handleConnect}>Connect Metamask</button> : <div>
          <h4>Connected wallet: {signer?.address}</h4>
          <form
            onSubmit={async (e) => {
              try {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const address = formData.get('address') as string
                const value = formData.get('value') as `${number}`
                if (!address || !value) return
                if (+value > +balance) {
                  setError('Insufficient Balance!!!')
                  return
                }
                setError('')
                setPending(true)
                setTxHash('')
                // send transaction with amount and address
                const tx = await signer.sendTransaction({ value: ethers.parseEther(value), to: address })
                console.log('... waiting for transaction ...')
                await tx.wait()
                console.log('Transaction success --> ', tx.hash)
                setTxHash(tx.hash)
                setPending(false)
              } catch (e: any) {
                setError(e?.toString())
                setPending(false)
              }
            }}
          >
            <input name="address" placeholder="address" />
            <input name="value" type="number" step='0.1' placeholder="value (ether)" />
            <button type="submit" disabled={isPending}>Send</button>
            <br />
            <p>
              Your balance: {balance}
            </p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isPending && <p>Transaction pending...</p>}
            {txHash && <a href={`https://goerli.etherscan.io/tx/${txHash}`} target='_blank' style={{ color: '#28a745', textDecoration: 'none' }}>View Transaction</a>}
          </form>
        </div>}
    </>
  )
}
