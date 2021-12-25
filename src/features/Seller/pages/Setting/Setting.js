import { Grid, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import userApi from "../../../../api/userApi";
import { useHistory } from "react-router-dom";
import ChangePasswordForm from "./components/ChangePasswordForm/index";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Setting = (props) => {
  const store = useStore();
  const classes = useStyles();
  const history = useHistory();
  const [openAlert, setOpenAlert] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState("error");

  let user = { ...store.getState().user.login.user };
  console.log("user", user);
  function handleSubmit(values) {
    (async () => {
      try {
        console.log(values);
        if (user.password !== values.oldPassword) {
          setOpenAlert(true);
          setContentAlert("Nhập mật khẩu hiện tại không đúng");
        } else {
          if (values.newPassword !== values.confirmPassword) {
            setOpenAlert(true);
            setContentAlert("Xác nhận mật khẩu không khớp");
          } else {
            const response = await userApi.changePassword(values);
            if (response.success) {
              setTimeout(() => {
                if (user.groupid === 1) {
                  history.push("/buyer/account");
                }
                if (user.groupid === 2) {
                  history.push("/seller/account");
                }
              }, 2000);

              setOpenAlert(true);
              setContentAlert(response.msg);
              setTypeAlert("success");
            }
          }
        }
      } catch (error) {
        console.log(`failed post update account as ${error}`);
      }
    })();
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item md={5} xs={12}>
          <ChangePasswordForm handleSubmit={handleSubmit} />
        </Grid>
      </Grid>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert onClose={() => setOpenAlert(false)} severity={typeAlert}>
          {contentAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Setting;
