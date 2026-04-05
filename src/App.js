import {useState,useEffect} from "react"
import {transactionsData} from "./Data/mockData"
import Transactions from "./components/Transactions"
import Insights from "./components/Insights"
import PieChartComponent from "./components/PieChartComponent"

function App(){

  let [list,setList]=useState(()=>{
    let saved=localStorage.getItem("transactions")
    if(saved){
      return JSON.parse(saved)
    }else{
      return transactionsData
    }
  })

  let [role,setRole]=useState("viewer")

  useEffect(()=>{
    localStorage.setItem("transactions",JSON.stringify(list))
  },[list])

  let income=0
  list.forEach((item)=>{
    if(item.type=="income"){
      income=income+item.amount
    }
  })

  let expenses=0
  list.forEach((item)=>{
    if(item.type=="expense"){
      expenses=expenses+item.amount
    }
  })

  let balance=income-expenses

  return(
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-4">
        Finance Dashboard By Vinay
      </h1>

      <select
        className="mb-4 p-2 border rounded"
        value={role}
        onChange={(e)=>setRole(e.target.value)}
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Net Balance" value={balance}/>
        <Card title="Income" value={income}/>
        <Card title="Expenses" value={expenses}/>
      </div>

      <PieChartComponent transactions={list}/>

      <Transactions
        transactions={list}
        role={role}
        setTransactions={setList}
      />

      <Insights transactions={list}/>

    </div>
  )
}

function Card(props){

  return(
    <div className="bg-white p-4 rounded shadow">

      <h2 className="text-gray-500">
        {props.title}
      </h2>

      <p className={`text-xl font-bold ${props.value<0?"text-red-500":""}`}>
        ₹{props.value}
      </p>

    </div>
  )
}

export default App