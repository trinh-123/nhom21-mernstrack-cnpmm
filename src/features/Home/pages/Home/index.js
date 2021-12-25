import React, { useEffect,useState } from "react";
import ImageGallery from "react-image-gallery";
import { connect, useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";
import EPLlogo from "../../../../assets/images/EPLlogo.png";
import Bunlogo from "../../../../assets/images/Bundesligalogo.png";
import Ligue1logo from "../../../../assets/images/Ligue1logo.png";
import Laligalogo from "../../../../assets/images/Laligalogo.jpg";
import Serialogo from "../../../../assets/images/Serialogo.jpg";
import Slider from "../../../../assets/images/slide.png";
import Slider1 from "../../../../assets/images/HomeSlide1.jpg";
import Slider2 from "../../../../assets/images/HomeSlide2.png";
import Slider3 from "../../../../assets/images/HomeSlide3.png";
import shirtsApi from "../../../../api/shirtsApi";
import userApi from "../../../../api/userApi";
import { getNews } from "../../../../actions/shirts";
import ShirtCard from "../../../../components/ShirtCard/ShirtCard";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollTop from "../../../../components/ScrollTop/ScrollTop";
import "./styles.scss";
const HomePage = (props) => {
  const images = [
    {
      original: Slider,
    },
    {
      original: Slider1,
    },
    {
      original: Slider2,
    },
    {
      original: Slider3,
    },
  ];
  const dispatch = useDispatch();
  const [data,setData]=useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await shirtsApi.getNew();
        console.log("resnew", response);
        let action = await getNews(response);
        dispatch(action);
        const res= await userApi.getBestSold();
        setData(res.data);
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
    return () => {
      // before effect and unmount
    };
  }, []);
  let dataArr =[];
  data.map(x=>{
    dataArr.push(x);
  })
  return (
    <React.Fragment>
      <Toolbar style={{ minHeight: "0px" }} id="back-to-top-anchor" />
      <div>
        <Row className="aHead">
          <Col xs={12} className="imageGallery">
            <ImageGallery
              items={images}
              autoPlay={true}
              showThumbnails={false}
            />
          </Col>
        </Row>
        <div className="logo">
          <Row>
            <Col>
              <img src={EPLlogo} width={100} alt="logo" />
            </Col>
            <Col>
              <img src={Bunlogo} width={120} alt="logo" />
            </Col>
            <Col>
              <img src={Laligalogo} width={180} alt="logo" />
            </Col>
            <Col>
              <img src={Ligue1logo} width={120} alt="logo" />
            </Col>
            <div className="seria">
              <Col>
                <img src={Serialogo} width={100} alt="logo" />
              </Col>
            </div>
          </Row>
        </div>
        <div className="new-product">
          <h3>Sản phẩm mới nhất</h3>
          <div class="ser-t">
            <b></b>
            <span>
              <i></i>
            </span>
            <b class="line"></b>
          </div>
          <Row xs={12} className="list-newProduct">
            {props.shirtsNew.map &&
              props.shirtsNew.map((item) => (
                <Col xs={3} key={item._id}>
                  <ShirtCard shirt={item} />
                </Col>
              ))}
          </Row>
        </div>
        <div className="spec-product">
            <h3>Đề xuất cho bạn</h3>
            <div class="ser-t">
              <b></b>
              <span>
                <i></i>
              </span>
              <b class="line"></b>
            </div>
            <Row xs={12} className="list-specProduct">
            {dataArr.map &&
              dataArr.map((item) => (
                <Col xs={3} key={item._id}>
                  <ShirtCard shirt={item} />
                </Col>
              ))}
          </Row>
        </div>
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  shirtsNew: state.shirts.shirtsNew,
  shirtsStore: state.shirts.shirtsStore,
});

export default connect(mapStateToProps, null)(HomePage);
