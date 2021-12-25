import React, { useEffect ,useState} from "react";
import { Bar } from "react-chartjs-2";
import userApi from "../../../../api/userApi";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./index.scss";
import { Col, Row } from "reactstrap";
import BestSoldByQuarter from "./BestSoldByQuarter";
const useStyles = makeStyles({
  root: {
    minWidth: 300,
    display: "inline-block",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  money: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bolder",
  },
});
const Statistic = () => {
  const [data,setData]=useState([]);
  const [orderList,setOrderList]=useState([]);
  const [totalDiscount,setTotalDiscount]=useState(0);
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      const response = await userApi.getStatistic();
      let res = await userApi.getOrderBySeller();
      const resp =await userApi.getDiscountPrice();
      var total =0;
      resp.data.forEach(element => {
        element.discount.forEach((x)=>{
          if(x.status==1){
            total+=x.price
          }
        })
      });
      setTotalDiscount(total);
      console.log("e",resp);
      setData(response.data)
      setOrderList(res.orders);
    })();
  }, []);
let revenueArr=[];
let countTotal =0;
data.map((x)=>{
    revenueArr.push(x.total*1000)
    countTotal=countTotal+x.total
})
let count =0;
orderList.map((x)=>{
  if(x.status!=4){
    count++;
  }
})
  return (
    <div>
      <Row className="row-card">
        <Col xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Tổng doanh thu
              </Typography>
              <Typography className={classes.money}>{countTotal*1000}đ</Typography>
            </CardContent>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Tổng chiết khấu
              </Typography>
              <Typography className={classes.money}>{totalDiscount}</Typography>
            </CardContent>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Tổng đơn hàng
              </Typography>
              <Typography className={classes.money}>{count}</Typography>
            </CardContent>
          </Card>
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
      <BestSoldByQuarter/>
    </div>
  );
};
export default Statistic;
