import { useEffect, useState } from 'react'
import lottery from '../lottery'
import Lottery from '../lottery'
import web3 from '../web3'


export default function Home() {

  const [state, setState] = useState({
    manager: '', participate_amount: 0.01, message: '', totalAmount: 0
  })

  const getPublicAddressManagerAddress = async () => {
    try {
      const address = await Lottery.methods.manager().call()
      setState(prev => ({ ...prev, manager: address }))
    } catch (error) {
      console.log(error)
    }

  }

  const getLotteryAmount = async () => {
    try {
      const totalAmount = await web3.eth.getBalance(Lottery.options.address)
      setState(prev => ({ ...prev, totalAmount: web3.utils.fromWei(totalAmount) + " ether" }))
    } catch (error) {
      console.log(error)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState((prev) => ({ ...prev, message: "" }))

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (state.participate_amount < 0.01) {
        return alert("Amount is less that 0.01 please enter a bigger amount")
      }
      setState((prev) => ({ ...prev, message: "Please Wait..." }))
      await Lottery.methods.enterLottery().send({
        from: accounts[0],
        value: web3.utils.toWei(String(state.participate_amount), 'ether')
      })
      setState((prev) => ({ ...prev, message: "You have been added to the lottery!" }))
    } catch (error) {
      console.log(error)
      setState((prev) => ({ ...prev, message: error.message }))

    }
  }

  const handlePickWinner = async () => {
    setState(prev => ({ ...prev, message: "please wait..." }))
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const winner = await Lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    setState(prev => ({ ...prev, message: 'Payment sent to winner' }))
  }

  useEffect(() => {
    getPublicAddressManagerAddress()
    getLotteryAmount()
  }, [])

  return (
    <div>
      <h2>Total lottery pool is {state.totalAmount}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="0.5" value={state.participate_amount} onChange={(e) => setState((prev) => ({ ...prev, participate_amount: e.target.value }))} />
        <button type="submit">Participate</button>
      </form>
      <p>{state.message}</p>
      <hr /><br /><hr />
      <p>The manager of the lottery decentralized app is {state.manager}</p>
      <button onClick={handlePickWinner}>Pick Winner</button>
    </div>
  )
}
