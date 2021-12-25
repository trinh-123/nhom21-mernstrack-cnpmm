import React, { useEffect, useState } from "react";
import { Pie,defaults } from "react-chartjs-2";
import userApi from "../../../../../api/userApi";
import { Col, Row } from "reactstrap";
defaults.plugins.legend.position ='bottom';
const BestSoldByQuarter = () => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await userApi.getBestSoldByQuarter();
            setData1(response.data1)
            setData2(response.data2)
            setData3(response.data3)
            setData4(response.data4)
        })();
    }, []);
    let arrName1 = [];
    let arrData1 = [];
    data1.forEach(element => {
        arrName1.push(element.product.name);
        arrData1.push(element.count);
    });
    let arrName2 = [];
    let arrData2 = [];
    data2.forEach(element => {
        arrName2.push(element.product.name);
        arrData2.push(element.count);
    });
    let arrName3 = [];
    let arrData3 = [];
    data3.forEach(element => {
        arrName3.push(element.product.name);
        arrData3.push(element.count);
    });
    let arrName4 = [];
    let arrData4 = [];
    data4.forEach(element => {
        arrName4.push(element.product.name);
        arrData4.push(element.count);
    });
    return (
        <div>
            <h5 style={{textAlign:"center"}}>Top 5 sản phẩm bán chạy nhất theo quý</h5>
            <Row>
                <Col xs={6}>
                    <Pie
                        data={{
                            labels: arrName1,
                            datasets: [
                                {
                                    data: arrData1,
                                    backgroundColor: ["#00FFFF", "#FFCCFF", "#00CCFF", "#00CC33", "#FF9933"],
                                    borderColor: ["rgba(255, 159, 64, 1)"],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={400}
                        width={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        font: {
                                            size: 10
                                        }
                                    }
                                },
                                title:{
                                    display: true,
                                    text: "Quý 1"
                                }
                            }
                        }}
                    />
                </Col>
                <Col xs={6}>
                    <Pie
                        data={{
                            labels: arrName2,
                            datasets: [
                                {
                                    data: arrData2,
                                    backgroundColor: ["#00FFFF", "#FFCCFF", "#00CCFF", "#00CC33", "#FF9933"],
                                    borderColor: ["rgba(255, 159, 64, 1)"],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={400}
                        width={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        font: {
                                            size: 10
                                        }
                                    }
                                },
                                title:{
                                    display: true,
                                    text: "Quý 2"
                                }
                            }
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                <Pie
                        data={{
                            labels: arrName3,
                            datasets: [
                                {
                                    data: arrData3,
                                    backgroundColor: ["#00FFFF", "#FFCCFF", "#00CCFF", "#00CC33", "#FF9933"],
                                    borderColor: ["rgba(255, 159, 64, 1)"],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={400}
                        width={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        font: {
                                            size: 10
                                        }
                                    }
                                },
                                title:{
                                    display: true,
                                    text: "Quý 3"
                                }
                            }
                        }}
                    />
                </Col>
                <Col xs={6}>
                <Pie
                        data={{
                            labels: arrName4,
                            datasets: [
                                {
                                    data: arrData4,
                                    backgroundColor: ["#00FFFF", "#FFCCFF", "#00CCFF", "#00CC33", "#FF9933"],
                                    borderColor: ["rgba(255, 159, 64, 1)"],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={400}
                        width={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        font: {
                                            size: 10
                                        }
                                    }
                                },
                                title:{
                                    display: true,
                                    text: "Quý 4"
                                }
                            }
                        }}
                    />
                </Col>
            </Row>            
        </div>
    )
}
export default BestSoldByQuarter;