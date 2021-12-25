import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Modal,
} from "@material-ui/core";
import RatingForm from "./components/RatingForm";
//import AddShirtsForm from "./components/AddShirtsForm";
import { compose } from "redux";
import { connect } from "react-redux";
import { Component } from "react";
import "./OrderToolbar.scss";
const useStyles = (theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
});

class OrderToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      formValues: {},
      options: {},
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  generateBodyModal() {
    const bodyModal = (
      <div style={{}} className="body">
        <Card className="">
          <CardHeader
            subheader="Đánh giá của bạn"
            title="Phản hồi chất lượng sản phẩm"
          />
          <Divider />
          <CardContent>
            <RatingForm
              idProduct={this.props.productID}
              idOrder={this.props.orderID}
            />
          </CardContent>
          <Divider />
          <CardActions
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          ></CardActions>
        </Card>
      </div>
    );
    return bodyModal;
  }
  handleOpen() {
    this.setState({
      openModal: true,
    });
  }

  handleClose() {
    this.setState({
      openModal: false,
    });
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const { openModal } = this.state;
    console.log("propsOrder", this.props);
    return (
      <div {...rest} className={clsx(classes.root, className)}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Modal
            open={openModal}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className="Modal"
          >
            {this.generateBodyModal()}
          </Modal>
        </div>
        <div className={classes.row}>
          <Button color="primary" variant="contained" onClick={this.handleOpen}>
            Đánh giá
          </Button>
        </div>
        <div className={classes.row}>
          {/* <SearchInput
                        className={classes.searchInput}
                        placeholder="Search product"
                    /> */}
        </div>
      </div>
    );
  }
}
export default compose(
  withStyles(useStyles),
  connect(null, null)
)(OrderToolBar);
