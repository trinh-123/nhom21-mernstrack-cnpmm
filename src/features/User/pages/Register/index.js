import React from "react";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { Avatar, Container, Snackbar, Typography } from "@material-ui/core";
import RegisterForm from "../../components/RegisterForm";
import { registerUser } from "../../../../actions/user";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import userApi from "../../../../api/userApi";
import "./styles.scss";
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlert: false,
      typeAlert: "",
      contentAlert: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    (async () => {
      try {
        const response = await userApi.register(values);
        let action = await registerUser(response);
        let resDispatch = this.props.dispatch(action);
        console.log("res", response);
        if (resDispatch.payload.success) {
          this.setState({
            contentAlert: response.msg,
            typeAlert: "success",
            openAlert: true,
          });
          setTimeout(() => {
            this.props.history.push("/user/login");
          }, 3000);
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
      <Container component="main" maxWidth="xs" className="register">
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký tài khoản
          </Typography>
          <RegisterForm handleSubmit={this.handleSubmit} />
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

RegisterPage.propTypes = {};

export default connect(null, null)(RegisterPage);
