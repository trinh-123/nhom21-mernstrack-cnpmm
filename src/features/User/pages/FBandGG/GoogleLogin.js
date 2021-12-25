import React, { Component } from "react";
import GoogleLoginBtn from "react-google-login";
import { withRouter } from "react-router-dom";
import userApi from "../../../../api/userApi";
import { connect } from "react-redux";
import { loginUser } from "../../../../actions/user";
import { setSession } from "../../../../untils/auth";
class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      name: "",
      email: "",
      picture: "",
    };
  }
  responseSuccessGoogle = async (respone) => {
    console.log("tokenId", respone);
    const values = {
      tokenId: respone.tokenId,
      // name: respone.name,
      // id: respone.id,
      // email: respone.email
    };

    const res = await userApi.loginGoogle(values);
    console.log(res);
    let action = await loginUser(res);
    let resDispatch = this.props.dispatch(action);
    if (resDispatch.payload.success) {
      setSession(
        res.data.user.name,
        res.data.token,
        res.data.user.groupid,
        res.data.user.email,
        res.data.user._id
      );
      if (res.data.user.groupid === 1) {
        this.props.history.push("/");
      }
    }
    // localStorage.setItem(this.ACCESS_TOKEN, res.token);
    // localStorage.setItem(this.ROLE, res.user.groupid);
    // localStorage.setItem(this.EMAIL, res.user.email);
    // localStorage.setItem(this.USER_ID, res.user._id);
    // if(res.user.groupid=== 1) {
    //      this.props.history.push("/")
    // }
  };
  responseFailGoogle = async (respone) => {
    console.log("err");
  };
  render() {
    let GoogleData;
    this.state.auth
      ? (GoogleData = <div>Hi!</div>)
      : (GoogleData = (
          <GoogleLoginBtn
            clientId="75435593592-ibbekma2opi25sc4bnfnrr276ki2ne01.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseSuccessGoogle}
            onFailure={this.responseFailGoogle}
            cookiePolicy={"single_host_origin"}
          />
        ));

    return <div>{GoogleData}</div>;
  }
}
export default withRouter(connect(null, null)(GoogleLogin));
