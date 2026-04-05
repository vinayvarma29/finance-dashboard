import {useState} from "react"

function Transactions(props){

  let list=props.transactions
  let role=props.role
  let setList=props.setTransactions

  let [search,setSearch]=useState("")
  let [amt,setAmt]=useState("")
  let [cat,setCat]=useState("")
  let [type,setType]=useState("expense")

  let filtered=list.filter((item)=>{
    return item.category.toLowerCase().includes(search.toLowerCase())
  })

  function addOne(){

    if(!amt||!cat){
      return
    }

    let obj={
      id:Date.now(),
      date:new Date().toISOString().split("T")[0],
      amount:Number(amt),
      category:cat,
      type:type
    }

    setList([...list,obj])

    setAmt("")
    setCat("")
    setType("expense")
  }

  function removeOne(id){

    let newList=list.filter((item)=>{
      return item.id!=id
    })

    setList(newList)
  }

  return(
    <div className="bg-white p-4 rounded shadow mt-6">

      <h2 className="text-lg font-bold mb-3">
        Transactions
      </h2>

      <input
        placeholder="Search by category..."
        className="border p-2 mb-3 w-full"
        onChange={(e)=>setSearch(e.target.value)}
      />

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            {role==="admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>

          {filtered.map((one)=>{
            return(
              <tr key={one.id} className="border-b">
                <td>{one.date}</td>
                <td>{one.category}</td>
                <td>₹{one.amount}</td>
                <td className={one.type==="income"?"text-green-600":"text-red-500"}>
                  {one.type}
                </td>

                {role==="admin" && (
                  <td>
                    <button
                      onClick={()=>removeOne(one.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                )}

              </tr>
            )
          })}

        </tbody>

      </table>

      {role==="admin" && (

        <div className="mt-4 flex flex-wrap gap-2">

          <input
            placeholder="Amount"
            value={amt}
            onChange={(e)=>setAmt(e.target.value)}
            className="border p-2"
          />

          <input
            placeholder="Category"
            value={cat}
            onChange={(e)=>setCat(e.target.value)}
            className="border p-2"
          />

          <select
            value={type}
            onChange={(e)=>setType(e.target.value)}
            className="border p-2"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={addOne}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>

        </div>

      )}

    </div>
  )
}

export default Transactions