import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import StoreImg from "../../../../../../../assets/images/store_img.png";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "fit-content",
  },
  avatar: {
    marginTop: 30,
    width: 60,
    height: 60,
    marginLeft: 30,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className } = props;
  const classes = useStyles();

  const user = {
    name: props.user.name,
    avatar: props.user.avatar || StoreImg,
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

function mapStateToProps(state) {
  return { user: state.user.login.user };
}

export default connect(mapStateToProps)(Profile);
