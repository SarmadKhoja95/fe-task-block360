import { useAccount, useBalance as useBalanceHook } from 'wagmi'

export const useBalance = () => {
  const { address } = useAccount()
  const { data } = useBalanceHook({
    address,
    watch: true,
  })

  return data
}
