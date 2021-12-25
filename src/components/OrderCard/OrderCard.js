import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import { getGroupId } from "../../untils/auth";
import OrderToolBar from "./components/OrderToolbar";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
function groupByOrderStatus(id) {
  let msg;
  if (id === 0) {
    msg = "Chưa xác nhận";
  } else if (id === 1) {
    msg = "Đã xác nhận";
  } else if (id === 2) {
    msg = "Đã thanh toán";
  } else if (id === 3) {
    msg = "Đã giao hàng";
  } else {
    msg = "Đã hủy";
  }
  return msg;
}
function showRating(props) {
  console.log("1",props.order)
  if (
    props.orderDetail.orderDetail.status === 3 &&
    getGroupId() == 1 && props.order.isRating===0
  ) {
    return (
      <div>
        <OrderToolBar
          productID={props.order.productID._id}
          orderID={props.orderDetail.orderDetail._id}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}
export default function OrderCard(props) {
  const classes = useStyles();
  console.log("props", props);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={props.order.productID.images}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.order.productID.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Size: {props.order.size}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Số lượng: {props.order.amount}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Trạng thái :{" "}
                  {groupByOrderStatus(props.orderDetail.orderDetail.status)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {props.order.productID.price}.000đ
              </Typography>
              <Typography>{showRating(props)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
