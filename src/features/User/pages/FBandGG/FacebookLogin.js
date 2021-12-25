import React, { Component } from "react";
import FacebookLoginBtn from "react-facebook-login";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import userApi from "../../../../api/userApi";
import { loginUser } from "../../../../actions/user";
import { setSession } from "../../../../untils/auth";
class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    //const match = useRouteMatch();
    this.state = {
      auth: false,
      name: "",
      email: "",
      picture: "",
    };
  }

  ACCESS_TOKEN = "accessToken";
  REFRESH_TOKEN = "refeshToken";
  USER_ID = "userId";
  NAME = "name";
  ROLE = "groupid";
  EMAIL = "email";

  responseFacebook = async (respone) => {
    const values = {
      accessToken: respone.accessToken,
      name: respone.name,
      id: respone.id,
      email: respone.email,
    };

    const res = await userApi.loginFacebook(values);
    console.log(res);
    let action = await loginUser(res);
    let resDispatch = this.props.dispatch(action);
    if (resDispatch.payload.success) {
      setSession(
        res.data.user.name,
        res.data.accessToken,
        res.data.user.groupid,
        res.data.user.email,
        res.data.user._id
      );
      if (res.data.user.groupid === 1) {
        this.props.history.push("/");
      }
    }
  };

  render() {
    let FacebookData;
    this.state.auth
      ? (FacebookData = <div>Hi!</div>)
      : (FacebookData = (
          <FacebookLoginBtn
            appId="151791427050643"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
            cssClass="btnFacebook"
            icon="fa-facebook"
            textButton="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login with Facebook"
          />
        ));

    return <div>{FacebookData}</div>;
  }
}
export default withRouter(connect(null, null)(FacebookLogin));
