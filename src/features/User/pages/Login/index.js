import { Avatar, Container, Typography, Snackbar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { loginUser } from "../../../../actions/user";
import userApi from "../../../../api/userApi";
import LoginForm from "../../components/LoginForm";
import { setSession } from "../../../../untils/auth";
import "./styles.scss";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentAlert: "",
      typeAlert: "",
      openAlert: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    (async () => {
      try {
        const response = await userApi.login(values);
        let action = await loginUser(response);
        let resDispatch = this.props.dispatch(action);
        if (resDispatch.payload.success) {
          setSession(
            response.data.user.name,
            response.data.accessToken,
            response.data.user.groupid,
            response.data.user.email,
            response.data.user._id,
            response.data.user.phone,
            response.data.user.address
          );
          if (response.data.user.groupid === 1) {
            this.props.history.push("/");
          }
          if (response.data.user.groupid === 2) {
            this.props.history.push("/seller/account");
          }
          if (response.data.user.groupid === 3) {
            this.props.history.push("/admin");
          }
        } else {
          this.setState({
            contentAlert: response.msg,
            openAlert: true,
            typeAlert: "error",
          });
        }
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
  }
  render() {
    return (
      <Container component="main" maxWidth="xs" className="login">
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <LoginForm handleSubmit={this.handleSubmit} />
        </div>
        <Snackbar
          open={this.state.openAlert}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({ openAlert: false });
          }}
        >
          <Alert
            onClose={() => {
              this.setState({ openAlert: false });
            }}
            severity={this.state.typeAlert}
          >
            {this.state.contentAlert}
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

LoginPage.propTypes = {};

export default connect(null, null)(LoginPage);
