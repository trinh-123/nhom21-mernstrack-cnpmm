import { Avatar, Container, Typography, Snackbar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { forgot } from "../../../../actions/user";
import userApi from "../../../../api/userApi";
import ForgotForm from "../../components/ForgotForm";
import "./styles.scss";

class ForgotPage extends React.Component {
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
        const response = await userApi.forgot(values);
        let action = await forgot(response);
        console.log("res", response);
        let resDispatch = this.props.dispatch(action);
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
      <Container component="main" maxWidth="xs" className="login">
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Quên mật khẩu
          </Typography>
          <ForgotForm handleSubmit={this.handleSubmit} />
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

ForgotPage.propTypes = {};

export default connect(null, null)(ForgotPage);
