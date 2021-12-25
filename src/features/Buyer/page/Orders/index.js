import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import userApi from "../../../../api/userApi";

import "./index.scss";

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

export default function Orders() {
  const [columns] = useState([
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
            <Link to={`/buyer/orders/detail/${rowData.management}`}>
              Quản lí
            </Link>
          </div>
        );
      },
    },
  ]);
  const [data, setData] = useState([
    {
      cart: ["default1", "default2", "default2"],
      totalPrice: 0,
      status: "default",
      date: "defalt",
      action: "1",
      management: "quản lí",
    },
  ]);

  useEffect(() => {
    (async function () {
      let response = await userApi.getOders();
      if (response.success) {
        setData(
          response.orders.map((order) => {
            return {
              cart: order.productList.map((product) => {
                return `${product.productID.name} - ${product.amount} - ${product.size}`;
              }),

              totalPrice: order.totalPrice + ".000đ",
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

  const handleChangeStatus = (rowData, status) => {
    (async function () {
      let response = await userApi.changeStautus(rowData.action, status);
      console.log(response);
      if (response.success) {
        setData(
          response.orders.map((order) => {
            return {
              cart: order.productList.map((product) => {
                return `${product.productID.name} - ${product.amount} - ${product.size}`;
              }),

              totalPrice: order.totalPrice + ".000đ",
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

  return (
    <div className="orders-buyer">
      <MaterialTable
        title="Đơn hàng của tôi"
        options={{
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
          rowStyle: {
            backgroundColor: "#EEE",
            marginLeft: "50px",
          },
        }}
        columns={columns}
        data={data}
      />
    </div>
  );
}
