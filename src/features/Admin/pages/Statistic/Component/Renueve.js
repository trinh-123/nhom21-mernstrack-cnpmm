import React, { useEffect ,useState} from "react";
import { Bar } from "react-chartjs-2";
import { Col, Row } from "reactstrap";
import userApi from "../../../../../api/userApi";
import "./Renueve.scss"
const Renueve = (props) => {
  console.log("prop",props)
  const [data,setData]=useState([]);
  const [seller,setSeller]=useState("5ff887ef3286040bb44b7fb3");
  useEffect(() => {
    (async () => {
      
      let params={
        seller_id:seller
      }
      const response = await userApi.getRevenueByAdmin(params);
     
      setData(response.data);
     
    })();
  }, [seller]);
let revenueArr=[];
let countTotal =0;
data.map((x)=>{
    revenueArr.push(x.total*1000)
    countTotal=countTotal+x.total
})
console.log("audh",seller)
  return (
    <div>
      <Row>
        <label className="seller">Seller:</label>
        <Col xs={6}>
          <select className="item"
                onChange={(event) => {
                  setSeller(event.target.value);
                }}
                value={seller}
              >
                {props.sellerList.map((x) => {
                  return (
                    <option key={x._id} value={x._id}>
                      {x.name}
                    </option>
                  );
                })}
              </select>
        </Col>
      </Row>
      <div className="chart">
        <Bar
          data={{
            labels: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 5",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
            datasets: [
              {
                label: "Theo tháng",
                data: revenueArr,
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(255, 159, 64, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={500}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};
export default Renueve;
