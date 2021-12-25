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
import PropTypes from "prop-types";
import AddShirtsForm from "./components/AddShirtsForm";
import { compose } from "redux";
import { connect } from "react-redux";
import categoriesApi from "../../../../../../api/categoriesApi";
import {
  getCategories,
  getParentCategoies,
} from "../../../../../../actions/shirts";
import "./ShirtsToolbar.scss";
// import { SearchInput } from "components";

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

class ProductsToolbar extends React.Component {
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
    (async () => {
      try {
        const response = await categoriesApi.getCategories();
        console.log("res1", response);
        let action = await getCategories(response);
        const response2 = await categoriesApi.getParentCategories();
        console.log("res2", response2);
        let action2 = await getParentCategoies(response2);
        this.props.dispatch(action);
        this.props.dispatch(action2);
        console.log("action", action);
        console.log("action2", action2);
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
    const bodyModal = (
      <div style={{}} className="body">
        <Card className="">
          <CardHeader
            subheader="Mô tả thông tin sản phẩm"
            title="Đăng bán sản phẩm"
          />
          <Divider />
          <CardContent>
            <AddShirtsForm />
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
            Đăng bán sản phẩm
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

ProductsToolbar.propTypes = {
  className: PropTypes.string,
};

export default compose(
  withStyles(useStyles),
  connect(null, null)
)(ProductsToolbar);
