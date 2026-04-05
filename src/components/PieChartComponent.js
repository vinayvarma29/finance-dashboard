import {PieChart,Pie,Cell,Tooltip,ResponsiveContainer} from "recharts"

function PieChartComponent(props){

  let list=props.transactions

  let mapData={}

  list.forEach((item)=>{
    if(item.type==="expense"){
      if(mapData[item.category]){
        mapData[item.category]=mapData[item.category]+item.amount
      }else{
        mapData[item.category]=item.amount
      }
    }
  })

  let finalData=[]

  Object.keys(mapData).forEach((k)=>{
    finalData.push({
      name:k,
      value:mapData[k]
    })
  })

  let colors=["#0088FE","#00C49F","#FFBB28","#FF8042"]

  return(
    <div className="bg-white p-4 rounded shadow mt-6 h-80">

      <h2 className="text-lg font-bold mb-3">
        Spending Breakdown
      </h2>

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={finalData}
            dataKey="value"
            outerRadius={100}
            label
          >

            {finalData.map((one,i)=>{
              return(
                <Cell key={i} fill={colors[i%colors.length]}/>
              )
            })}

          </Pie>

          <Tooltip/>

        </PieChart>

      </ResponsiveContainer>

    </div>
  )
}

export default PieChartComponent