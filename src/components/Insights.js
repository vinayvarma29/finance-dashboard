function Insights(props){

  let list=props.transactions

  let data={}

  list.forEach((item)=>{
    if(item.type=="expense"){
      if(data[item.category]){
        data[item.category]=data[item.category]+item.amount
      }else{
        data[item.category]=item.amount
      }
    }
  })

  let top="None"
  let big=0

  for(let cat in data){
    if(data[cat]>big){
      big=data[cat]
      top=cat
    }
  }

  return(
    <div className="bg-white p-4 rounded shadow mt-6">

      <h2 className="text-lg font-bold mb-2">
        Insights
      </h2>

      <p className="mb-2">
       Highest Spending Category: <b>{top}</b>
      </p>

      <p>
        Total Expenses: <b>₹{big}</b>
      </p>

    </div>
  )
}

export default Insights