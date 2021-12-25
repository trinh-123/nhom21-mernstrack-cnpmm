import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import OrderCard from "../../OrderCard/OrderCard";
import "./index.scss";
import Typography from "@material-ui/core/Typography";
import { Row, Col } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
  },
  pos: {
    fontSize: 14,
  },
  image: {
    marginTop: "30px",
  },
  fee: {
    marginLeft: "30px",
  },
  total: {
    marginLeft: "13px",
    fontSize: 18,
  },
  deliveryFee: {
    marginLeft: "45px",
  },
  paper: {
    marginTop: "20px",
    padding: theme.spacing(2),
    fontSize: 16,
  },
  solid: {
    marginTop: "10px",
    borderTop: "1px solid #999",
  },
}));
export default function InforOrder(props) {
  console.log("props", props);
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Mã đơn hàng: {props.orderDetails.orderDetail._id}
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div>
        {props.orderDetails.orderDetail.productList.map((order) => (
          <OrderCard order={order} orderDetail={props.orderDetails} />
        ))}
      </div>
      <div>
        <Row>
          <Col xs={6}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  Địa chỉ giao hàng
                </Typography>
                <Typography className={classes.pos}>
                  {props.orderDetails.orderDetail.street},
                  {props.orderDetails.orderDetail.district},
                  {props.orderDetails.orderDetail.city}
                </Typography>
                <Typography className={classes.pos}>
                  Số điện thoại: {props.orderDetails.orderDetail.phone}
                </Typography>
              </CardContent>
            </Card>
          </Col>
          <Col xs={6}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  Tổng cộng
                </Typography>
                <Row>
                  <Col>
                    <Typography className={classes.pos}>Tạm tính:</Typography>
                  </Col>
                  <Col xs={3}>
                    <Typography className={classes.fee}>
                      {props.orderDetails.orderDetail.totalPrice}.000đ
                    </Typography>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Typography className={classes.pos}>
                      Phí giao hàng:
                    </Typography>
                  </Col>
                  <Col xs={3}>
                    <Typography className={classes.deliveryFee}>
                      0.000đ
                    </Typography>
                  </Col>
                </Row>
                <Row className={classes.solid}>
                  <Col>
                    <Typography className={classes.pos}>Tổng cộng:</Typography>
                  </Col>
                  <Col xs={3}>
                    <Typography className={classes.total}>
                      {props.orderDetails.orderDetail.totalPrice}.000đ
                    </Typography>
                  </Col>
                </Row>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
