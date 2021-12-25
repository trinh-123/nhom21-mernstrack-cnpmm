import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import ShirtCard from "../../../../components/ShirtCard/ShirtCard";
import MenuCategory from "../ShopList/components/MenuCategory/MenuCategory";
import Pagination from "@material-ui/lab/Pagination";
import shirtsApi from "../../../../api/shirtsApi";
import { getShirts } from "../../../../actions/shirts";
const SearchProduct = (props) => {
  const [page, setPage] = useState(1);
  const [parentId, setParentId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async (event) => {
      try {
        const keyword = {
          keyword: event.target.value,
        };
        const response = await shirtsApi.search(keyword);
        const result = {
          docs: response,
          total: response.length,
          limit: 8,
          page: 1,
          pages: 1,
        };
        let action = await getShirts(result);
        dispatch(action);
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
    return () => {
      // before effect and unmount
    };
  }, []);

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
        </Col>
        <Col xs={9}>
          <Row>
            {props.shirtsShop.total &&
              props.shirtsShop.docs.map((shirt) => (
                <Col xs={3} key={shirt._id} style={{ marginBottom: "25px" }}>
                  <ShirtCard shirt={shirt} />
                </Col>
              ))}
          </Row>
          <Row className="mt-5">
            <Col sm={{ size: 6, offset: 4 }}>
              <Pagination
                count={props.shirtsShop.pages ? props.shirtsShop.pages : 1}
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
});

export default connect(mapStateToProps, null)(SearchProduct);
