import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Button } from "reactstrap";
import userApi from "../../../../../../api/userApi";
import { getUserId } from "../../../../../../untils/auth";
import { getListIDOrder, getPriceOrder } from "../../../../../../actions/user";
import vn from "../../../../../../vn.json";
import "./index.scss";

function Payment(props) {
  const history = useHistory();
  let { totalPrice: total, feeDelivery: fee } = props.cart;
  const [openAlert, setOpenAlert] = useState(false);
  const [code, setCode] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [street, setStreet] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState(0);
  const dispatch = useDispatch();
  const handleDiscount = () => {
    (async () => {
      try {
        let params = {
          code: code,
          userID: getUserId(),
        };
        const response = await userApi.applyDiscount(params);
        if (response.success) {
          setOpenAlert(true);
          setContent(response.msg);
          setType("success");
          window.location.reload();
        } else {
          setOpenAlert(true);
          setContent(response.msg);
          setType("warning");
        }
      } catch (error) {
        console.log(`failed remove cart api as ${error}`);
      }
    })();
  };
  const handleOrder = () => {
    (async () => {
      try {
        let params = {
          city: city,
          ward: ward,
          street: street,
          phone: phone,
          district: district,
        };
        if (
          params.street !== "" &&
          params.phone !== 0 &&
          params.district !== "" &&
          params.ward !== 0
        ) {
          const response = await userApi.order(params);
          const action1 = await getListIDOrder(response.data);
          const action2 = await getPriceOrder(total);
          dispatch(action1);
          dispatch(action2);
          console.log("strIdOrder", response.data);
          if (response.success) {
            setOpenAlert(true);
            setContent(
              "Đã đặt hàng thành công. Quý khách sẽ được chuyển sang trang thanh toán."
            );
            setType("success");
            setTimeout(function () {
              history.push("/user/checkout");
            }, 2000);
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
  var vn1 = vn;
  var districtByCityArr = vn1.filter((x) => {
    return x.name === city;
  });
  var districtArr = [];
  districtByCityArr.map((x) => {
    x.huyen.forEach(function (item) {
      districtArr.push(item);
    });
  });
  var wardArr = [];
  vn.forEach((x) => {
    if (x.name === city) {
      x.huyen.forEach((y) => {
        if (y.name === district) {
          y.xa.forEach((z) => {
            wardArr.push(z.name);
          });
        }
      });
    }
  });
  console.log("ad", wardArr);
  return (
    <div className="payment">
      <h5 className="mb-3">Thông tin đơn hàng</h5>
      <div className="cost">
        <p>Tạm tính</p>
        <div className="number">
          {total}.000<u>đ</u>
        </div>
      </div>
      <div className="cost">
        <p>Phí giao hàng</p>
        <div className="number">
          {fee}.000<u>đ</u>
        </div>
      </div>
      <div className="cost total">
        <p>Tổng cộng</p>
        <div className="number">
          {total + fee}.000<u>đ</u>
        </div>
      </div>
      <h5 className="mb-3">Địa chỉ giao hàng</h5>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-25">
              <label for="fname">Điện thoại</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                id="fname"
                name="firstname"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label for="subject">Tỉnh/TP</label>
            </div>
            <div className="col-75">
              <select
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                value={city}
                id="country"
                name="country"
              >
                <option aria-label="None" value="" />
                {vn.map((x, index) => {
                  return (
                    <option key={index} value={x.name}>
                      {x.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="country">Quận/Huyện</label>
            </div>
            <div className="col-75">
              <select
                onChange={(event) => {
                  setDistrict(event.target.value);
                }}
                value={district}
                id="country"
                name="country"
              >
                <option aria-label="None" value="" />
                {districtArr.map((x, index) => {
                  return (
                    <option key={index} value={x.name}>
                      {x.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="country">Phường/Xã</label>
            </div>
            <div className="col-75">
              <select
                onChange={(event) => {
                  setWard(event.target.value);
                }}
                value={ward}
                id="country"
                name="country"
              >
                <option aria-label="None" value="" />
                {wardArr.map((x, index) => {
                  return (
                    <option key={index} value={x}>
                      {x}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="lname">Đường/Xóm</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="lname"
                onChange={(event) => {
                  setStreet(event.target.value);
                }}
                name="lastname"
                required
              />
            </div>
          </div>
        </form>
      </div>
      <div className="discount-price">
        <input
          type="text"
          onChange={(event) => {
            setCode(event.target.value);
          }}
          placeholder="Mã giảm giá.."
        />
        <Button
          color="primary"
          block
          className="btn-discount"
          onClick={handleDiscount}
        >
          Áp dụng
        </Button>
      </div>
      <div className="button">
        <Button color="primary" block onClick={handleOrder}>
          Đặt hàng
        </Button>
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
const mapStateToProps = (state) => ({
  cart: state.cart,
});
export default connect(mapStateToProps, null)(Payment);
