import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CancelIcon from "@material-ui/icons/Cancel";
import CallIcon from "@material-ui/icons/Call";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import userApi from "../../../../api/userApi";
import "./Orders.scss";

function renderStatus(id) {
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

function Orders() {
  const [columns, setColumns] = useState([
    { title: "Khách hàng", field: "customer" },
    {
      title: "Giỏ hàng",
      field: "cart",
      render: (rowData) => {
        return rowData.cart.map((item) => <div>{item}</div>);
      },
    },
    {
      title: "Tổng tiền",
      field: "totalPrice",
    },
    {
      title: "Trạng thái",
      field: "status",
    },
    {
      title: "Ngày đặt",
      field: "date",
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowData) => {
        return (
          <div className="action">
            <CallIcon
              className="icon"
              color="primary"
              onClick={() => handleChangeStatus(rowData, 1)}
            />
            <MonetizationOnIcon
              className="icon"
              color="primary"
              onClick={() => handleChangeStatus(rowData, 2)}
            />
            <CheckBoxIcon
              className="icon"
              color="secondary"
              onClick={() => handleChangeStatus(rowData, 3)}
            />
            <CancelIcon
              className="icon"
              color="error"
              onClick={() => handleChangeStatus(rowData, 4)}
            />
          </div>
        );
      },
    },
    {
      title: "Quản lí",
      field: "management",
      render: (rowData) => {
        return (
          <div className="action">
            <Link to={`/seller/orders/detail/${rowData.management}`}>
              Quản lí
            </Link>
          </div>
        );
      },
    },
  ]);
  const [data, setData] = useState([
    {
      customer: "abc",
      cart: ["default1", "default2"],
      totalPrice: 0,
      status: "default",
      date: "defalt",
      action: "1",
      management: "quản lí",
    },
  ]);

  const handleChangeStatus = (rowData, status) => {
    (async function () {
      let response = await userApi.changeStautusSeller(rowData.action, status);
      if (response.success) {
        setData(
          response.orders.map((order) => {
            return {
              customer: order.customer.name,
              cart: order.productList.map((product) => {
                return `${product.productID.name} - ${product.amount}- ${product.size}`;
              }),
              totalPrice: order.totalPrice + ".000",
              status: renderStatus(order.status),
              date: order.createdAt,
              action: order._id,
              management: order._id,
            };
          })
        );
      }
    })();
  };

  useEffect(() => {
    (async function () {
      let response = await userApi.getOrderBySeller();
      console.log("res", response);
      if (response.success) {
        setData(
          response.orders.map((order) => {
            return {
              customer: order.customer.name,
              cart: order.productList.map((product) => {
                return `${product.productID.name} - ${product.amount}- ${product.size}`;
              }),
              totalPrice: order.totalPrice + ".000",
              status: renderStatus(order.status),
              date: order.createdAt,
              action: order._id,
              management: order._id,
            };
          })
        );
      }
    })();
    return () => {
      // do something
    };
  }, []);

  return (
    <MaterialTable
      title="Quản lí đơn hàng"
      options={{
        headerStyle: {
          backgroundColor: "#01579b",
          color: "#FFF",
          marginTop: "120px",
        },
        rowStyle: {
          backgroundColor: "#EEE",
          marginLeft: "50px",
        },
      }}
      columns={columns}
      data={data}
    />
  );
}
export default connect(null, null)(Orders);
