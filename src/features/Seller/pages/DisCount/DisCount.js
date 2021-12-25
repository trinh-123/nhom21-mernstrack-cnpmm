import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Button } from "reactstrap";
import userApi from "../../../../api/userApi";
import { getUserId } from "../../../../untils/auth";
import MaterialTable from "material-table";
import "./DisCount.scss";

function DisCount(props) {
  const [state, setState] = useState({
    columns: [
      { title: "Mã giảm giá", field: "code" },
      { title: "Số tiền giảm", field: "price" },
      { title: "Trạng thái", field: "status" },
    ],
    data: [],
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  let code = [];
  useEffect(() => {
    (async () => {
      try {
        setReload(false);
        const response = await userApi.getDiscount({ ID: getUserId() });
        console.log("rescca", response.discount.length);
        let codeData = [];
        for (let i = 0; i < response.discount.length; i++) {
          const result = {
            id: response.discount[i]._id,
            code: response.discount[i].code,
            price: response.discount[i].price,
            status: renderStatus(response.discount[i].status),
          };
          codeData.push(result);
        }
        setState({
          columns: [
            { title: "Mã giảm giá", field: "code" },
            { title: "Số tiền giảm", field: "price" },
            { title: "Trạng thái", field: "status" },
          ],
          data: codeData,
        });
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
    return () => {
      // before effect and unmount
    };
  }, [reload]);
  function renderStatus(id) {
    let msg;
    if (id === 0) {
      msg = "Chưa sử dụng";
    } else {
      msg = "Đã sử dụng";
    }
    return msg;
  }
  function makeCode() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleAddDiscount = () => {
    (async () => {
      try {
        for (var i = 0; i < amount; i++) {
          code.push(makeCode());
        }
        let params = {
          amount: amount,
          code: code,
          price: price,
          sellerID: getUserId(),
        };
        if (params.amount !== "" && params.price !== "") {
          const response = await userApi.addDiscount(params);
          if (response.success) {
            setOpenAlert(true);
            setReload(true);
            setContent("Đã tạo thành công");
            setType("success");
          } else {
            setOpenAlert(true);
            setContent(response.msg);
            setType("warning");
          }
        } else {
          setOpenAlert(true);
          setContent("Vui lòng nhập đầy đủ thông tin");
          setType("warning");
        }
      } catch (error) {
        console.log(`failed remove cart api as ${error}`);
      }
    })();
  };
  return (
    <div className="payment">
      <div>
        <h5 className="mb-3">Tạo mã giảm giá</h5>
        <div className="container">
          <form>
            <div className="row">
              <div className="col-25">
                <input
                  type="text"
                  onChange={(event) => {
                    setAmount(event.target.value);
                  }}
                  id="fname"
                  name="firstname"
                  placeholder="Số lượng"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <input
                  type="text"
                  id="lname"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                  name="lastname"
                  placeholder="Số tiền"
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div className="button">
          <Button color="primary" block onClick={handleAddDiscount}>
            Xác nhận
          </Button>
        </div>
      </div>
      <div>
        <MaterialTable
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
          title="Quản lý mã giảm giá"
          columns={state.columns}
          data={state.data}
        />
      </div>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert onClose={() => setOpenAlert(false)} severity={type}>
          {content}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default connect(null, null)(DisCount);
