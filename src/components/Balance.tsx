import { useBalance } from '../hooks/useBalance'

export const Balance = () => {
  const data = useBalance()
  return (
    <>
      <div>
        Your balance: {data?.formatted}
      </div>
    </>
  )
}
