import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import ShirtCard from "../../../../components/ShirtCard/ShirtCard";
import CardFilterCategory from "./components/CardFilterCategory/CardFilterCategory";
import CardFilterPrice from "./components/CardFilterPrice/CardFilterPrice";
import MenuCategory from "./components/MenuCategory/MenuCategory";
import Pagination from "@material-ui/lab/Pagination";
import categoriesApi from "../../../../api/categoriesApi";
import shirtsApi from "../../../../api/shirtsApi";
import { getCategoryByID } from "../../../../actions/shirts";
import PageLoading from "../../../../components/PageLoading";
import _ from "lodash";
import "./index.scss";

const ShopList = (props) => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [parentId, setParentId] = useState("");
  const [productByParentId, setProductByParentId] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let params = {
          page: page,
          perPage: 8,
          priceId: price,
          categoryId: category,
          parentCategoryId: parentId,
        };

        const response = await shirtsApi.getByPrice(params);
        setProductByParentId(response);
        console.log("in index", response);
        // let action = getShirts(response);
        // console.log("in ",action);
        // dispatch(action);
        const response2 = await categoriesApi.get(parentId);
        let action2 = await getCategoryByID(response2);
        dispatch(action2);
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
    return () => {
      // before effect and unmount
    };
  }, [page, price, category, parentId]);

  const onChangeCategory = (category) => {
    setPage(1);
    setCategory(category);
  };
  const onChangePrice = (price) => {
    setPage(1);
    setPrice(price);
  };
  const onChangeParentId = (id) => {
    setParentId(id);
  };
  return (
    <Container className=" ShopList" fluid={true}>
      <Row>
        <Col>
          <MenuCategory
            onChangeParentId={onChangeParentId}
            id={parentId}
            propId={props.match.params.id_parent}
          />
          <CardFilterCategory
            categories={props.categorybyid}
            onChangeCategory={onChangeCategory}
          />
          <CardFilterPrice onChangePrice={onChangePrice} />
        </Col>
        <Col xs={9}>
          <Row>
            {_.isEmpty(productByParentId) ? (
              <PageLoading/>
            ) : (
              productByParentId.total &&
              productByParentId.docs.map((shirt) => (
                <Col xs={3} key={shirt._id} style={{ marginBottom: "25px" }}>
                  <ShirtCard shirt={shirt} />
                </Col>
              ))
            )}
          </Row>
          <Row className="mt-5">
            <Col sm={{ size: 6, offset: 4 }}>
              <Pagination
                count={productByParentId.pages ? productByParentId.pages : 1}
                color="secondary"
                onChange={(e, page) => setPage(page)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  shirtsShop: state.shirts.shirtsShop,
  categorybyid: state.shirts.categorybyid,
});

export default connect(mapStateToProps, null)(ShopList);
