import React, { useEffect ,useState} from "react";
import { Bar } from "react-chartjs-2";
import { Col, Row } from "reactstrap";
import Renueve from "./Component/Renueve";
import userApi from "../../../../api/userApi";
import "./index.scss";

const Statistic = () => {
  const [sellerList,setSellerList]=useState([]);
  useEffect(() => {
    (async () => {
      const res = await userApi.getSeller();
      console.log("ré",res);
      setSellerList(res.data);
    })();
  }, []);

  return (
    <div>
     <Renueve sellerList={sellerList} />
    </div>
  );
};
export default Statistic;
