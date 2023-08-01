import { ethers, JsonRpcSigner } from 'ethers'
import { useCallback, useState } from 'react'

export const useSigner = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [balance, setBalance] = useState<string>('')

  const handleConnect = useCallback(async () => {
    // @ts-ignore
    if (!window.ethereum) {
      alert("MetaMask extention not installed!!")
      return
    }
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window?.ethereum)
    const _signer = await provider.getSigner()
    const res = await provider?.getBalance(_signer?.address)
    setBalance(ethers.formatEther(res.toString()))
    setSigner(_signer)
  }, [signer, balance])

  return { signer, balance, handleConnect }
}
