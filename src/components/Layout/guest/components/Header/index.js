import React, { useState, useEffect } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import StoreIcon from "@material-ui/icons/Store";
import MailIcon from "@material-ui/icons/Mail";
import DescriptionIcon from "@material-ui/icons/Description";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _ from "lodash";
import LogoImg from "../../../../../assets/images/logo.png";
import { isLogin, removeSession, getGroupId } from "../../../../../untils/auth";
import { connect, useDispatch } from "react-redux";
import "./index.scss";
import { ContactMail } from "@material-ui/icons";
import { getShirts, getNameProducts } from "../../../../../actions/shirts";
import shirtsApi from "../../../../../api/shirtsApi";
import { useHistory } from "react-router-dom";
const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `50px`,
      },
    },
  },
})(TextField);
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "50px",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  multilineColor: {
    color: "white",
  },
}));

function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [value, setValue] = useState(null);
  let history = useHistory();
  console.log("propsheader", props);
  const dispatch = useDispatch();
  const handleKeyPress = async (event) => {
    if(event.key === 'Enter'){
      console.log('enter press here! ',event.target.value)
      if (event.target.value == null) {
        console.log("values null");
      } else {
        const keyword = {
          keyword: event.target.value,
        };
        const response = await shirtsApi.search(keyword);
        const result = {
          docs: response,
          total: response.length,
          limit: response.length,
          page: 1,
          pages: 1,
        };
        let action = await getShirts(result);
        dispatch(action);
        history.push("/shop/search");
      }
    }
  }
  const handleSearchChange = async (event) => {
    const keyword = {
      keyword: event.target.value,
    };
    const response = await shirtsApi.search(keyword);
    const result = {
      docs: response,
      total: response.length,
      limit: response.length,
      page: 1,
      pages: 1,
    };
    let action = await getShirts(result);
    dispatch(action);
  };
  const handleClick = async (value) => {
    console.log("value",value);
    if (value == null) {
      console.log("values null");
    } else {
      const keyword = {
        keyword: value.name,
      };
      const response = await shirtsApi.search(keyword);
      const result = {
        docs: response,
        total: response.length,
        limit: response.length,
        page: 1,
        pages: 1,
      };
      let action = await getShirts(result);
      dispatch(action);
      history.push("/shop/search");
    }
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeSession();
    window.location.reload();
  };
  const options = props.shirtsName.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  useEffect(() => {
    (async () => {
      try {
        const responseListName = await shirtsApi.getNameProducts();
        let action = await getNameProducts(responseListName);
        dispatch(action);
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
    return () => {
      // before effect and unmount
    };
  }, []);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isLogin() ? (
        <div>
          <MenuItem>
            <Link onClick={handleMenuClose} to="/user/login">
              Đăng nhập
            </Link>
          </MenuItem>
          <MenuItem>
            <Link onClick={handleMenuClose} to="/user/register">
              Đăng ký
            </Link>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            {getGroupId() == 1 ? (
              <Link onClick={handleMenuClose} to="/buyer/">
                Quản lý tài khoản
              </Link>
            ) : (
              <Link onClick={handleMenuClose} to="/seller/">
                Quản lý tài khoản
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            <Link
              onClick={() => {
                handleMenuClose();
                handleLogout();
              }}
              to="/"
            >
              Đăng xuất
            </Link>
          </MenuItem>
        </div>
      )}
    </Menu>
  );
  return (
    <div className="header">
      <div className={classes.grow}>
        <AppBar
          style={{ backgroundColor: "rgb(228 231 232)", height: "62px" }}
          position="static"
        >
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link to="/" className="item">
                <img src={LogoImg} width={80} alt="logo" />
              </Link>
              <Badge>
                <Autocomplete
                  id="grouped-demo"
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      setValue({
                        name: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValue({
                        name: newValue.inputValue,
                      });
                    } else {
                      setValue(newValue);
                    }
                  }}
                  options={options.sort(
                    (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                  )}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.name}
                  style={{
                    width: 230,
                    height: 70,
                    marginTop: 15,
                    //borderRadius:"50px"
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label="Tìm kiếm sản phẩm"
                      variant="outlined"
                      onChange={handleSearchChange}
                      onKeyDown={handleKeyPress}
                      style={{
                        backgroundColor: "#f0f2f5",
                        borderRadius: "50px",
                      }}
                    />
                  )}
                />
                <IconButton
                  color="inherit"
                  type="submit"
                  borderRadius="0px"
                  style={{ border: "none" }}
                  onClick={()=>handleClick(value)}
                >
                  <SearchIcon />
                </IconButton>
              </Badge>
            </Typography>
            <div className="nav-list">
              <NavLink
                exact
                to="/"
                className="item"
                activeClassName="item--active"
              >
                <IconButton color="default" className="icon">
                  <HomeIcon />
                </IconButton>
                <span className="tooltiptext">Trang chủ</span>
              </NavLink>
              <NavLink
                exact
                to={`/shop/${"60507c6e89323c1f3c905655"}`}
                className="item"
                activeClassName="item--active"
              >
                <IconButton className="icon">
                  <StoreIcon />
                </IconButton>
                <span className="tooltiptext">Sản phẩm</span>
              </NavLink>
              <NavLink
                exact
                to="/about"
                className="item"
                activeClassName="item--active"
              >
                <IconButton className="icon">
                  <DescriptionIcon />
                </IconButton>
                <span className="tooltiptext">Giới thiệu</span>
              </NavLink>
              <NavLink
                exact
                to="/contact"
                className="item"
                activeClassName="item--active"
              >
                <IconButton className="icon">
                  <MailIcon />
                </IconButton>
                <span className="tooltiptext">Liên hệ</span>
              </NavLink>
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton>
                <Link to="/user/cart/" style={{ color: "#fff" }}>
                  <IconButton aria-label="show 4 new mails">
                    <Badge
                      badgeContent={
                        _.isEmpty(props.cart)
                          ? 0
                          : props.cart.productList.length
                      }
                      color="secondary"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
              </IconButton>
              <IconButton
                edge={"end"}
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                {isLogin() ? <ContactMail /> : <AccountCircle />}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  cart: state.cart,
  shirtsName: state.shirts.shirtsName,
});
export default connect(mapStateToProps, null)(PrimarySearchAppBar);
