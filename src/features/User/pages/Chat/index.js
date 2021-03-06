import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import SendIcon from "@material-ui/icons/Send";
import UserAPI from "../../../../api/messageApi";
import ListUser from "./Components/ListUser";
import "./index.scss";
import queryString, { stringify } from "query-string";
import parse from "html-react-parser";
import { IconButton } from "@material-ui/core";
import io from "socket.io-client";
import { getUserId, getName, getGroupId } from "../../../../untils/auth";

const socket = io("https://kltn-ntshop.herokuapp.com/", { transports: ['websocket', 'polling', 'flashsocket'] });
function Chat(props) {
  const [name, setName] = useState("");

  const [userID1, setUserID1] = useState(getUserId());
  const [userID2, setUserID2] = useState("");

  const [listUser, setListUser] = useState([]);

  const [anotherUser, setAnotherUser] = useState({});

  const [conversation, setConversation] = useState([]);

  const [load, setLoad] = useState(false);

  const [send, setSend] = useState("");

  const [loadMessage, setLoadMessage] = useState(false);

  const [messReceive, setMessReceive] = useState("");
  const [user1_Receive, setUser1Receive] = useState("");
  const [user2_Receive, setUser2Receive] = useState("");

  const GetUserID = (value) => {
    const id_another = value;

    const another = listUser.find((value) => {
      return value._id === id_another;
    });

    console.log("getUserID", id_another);

    setAnotherUser(another);

    setLoad(true);

    setUserID2(id_another);
  };
  const fetchData1 = async () => {
    const response = await UserAPI.getAllUserForChat();
    console.log(response);

    const filterUser = response.filter((value) => {
      return value._id !== getUserId();
    });
    console.log(filterUser);

    setListUser(filterUser);
  };
  useEffect(() => {
    fetchData1();
    //console.log(name)
  }, []);
  const onChangeSend = (e) => {
    const value = e.target.value;

    setSend(value);

    const data = {
      message: value,
      id_user1: userID2,
      id_user2: userID1,
    };

    // console.log(data)

    //N???u user ??ang b???m ph??m ????? g???i tin nh???n th?? s??? g???i socket l??n server v???i key keyboard_message_send
    //????? cho ?????i ph????ng bi???t l?? user ??ang g???i tin nh???n
    //V?? g???i l?? user mu???n g???i ?????n ng?????i n??o
    //N??n ch??ng ta ph???i l???y id_user c???a ?????i ph????ng m?? user mu???n g???i
    if (send) {
      socket.emit("keyboard_message_send", data);
    } else {
      socket.emit("keyboard_message_send", data);
    }
  };

  useEffect(() => {
    socket.on("keyboard_message_receive", (data) => {
      const message = data.message;
      const id_user1 = data.id_user1;
      const id_user2 = data.id_user2;

      //??? b??n ph??a ng?????i nh???n th?? s??? c?? userID1 c???a ch??nh m??nh
      //N???u m?? c?? tin nh???n v?? ????ng v???i id_user c???a ng?????i g???i ????ng v???i userID1 c???a ch??nh m??nh th?? s??? load
      if (message !== "" && id_user1 === userID1 && id_user2 === userID2) {
        console.log("id_user1", id_user1);
        console.log("id_user2", id_user2);
        console.log("idUser1", userID1);
        console.log("idUser2", userID2);
        setLoadMessage(true);
      } else {
        setLoadMessage(false);
      }
    });
  }, []);

  const handlerSend = () => {
    //N???u User ch??a b???m v??o th?? kh??ng th??? g???i ???????c
    if (!userID2) {
      return;
    }

    //G???i h??m formaticon ???? t???o s???n ????? x??? l??
    const formatMessage = formatIcon(send);

    //Khi g???i tin nh???n th?? n?? s??? l???y id c???a c??? 2 ng?????i
    //V???i c??i key category c?? value l?? send
    //V?? l?? g???i tin nh???n
    const data = {
      id_user1: userID1,
      id_user2: userID2,
      id: Math.random().toString(),
      message: formatMessage,
      name: getName(),
      category: "send",
    };

    console.log(data.name + ": " + data.message);

    //Sau ???? n?? emit d??? li???u l??n server b???ng socket v???i key send_message v?? value data
    socket.emit("send_message", data);

    //Ti???p theo n?? s??? postdata l??n api ????a d??? li???u v??o database
    const postData = async () => {
      const query = "?" + queryString.stringify(data);

      const response = await UserAPI.postMessage(query);

      console.log(response);

      //Sau ???? g???i h??m setLoad ????? useEffect l???y l???i d??? li???u sau khi update
      setLoad(true);
    };

    postData();

    setSend("");
  };
  function formatIcon(send) {
    //????y l?? list icon d??ng ????? duy???t v?? ????? ra d??? li???u
    const icon = [
      {
        id: 1,
        image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742760.svg' />`,
        category: ":(",
      },
      {
        id: 2,
        image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742750.svg' />`,
        category: "*_*",
      },
      {
        id: 3,
        image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742920.svg' />`,
        category: ":)",
      },
      {
        id: 4,
        image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742822.svg' />`,
        category: "T_T",
      },
      {
        id: 5,
        image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742787.svg' />`,
        category: "-,-",
      },
      {
        id: 6,
        image: `<img src='https://www.flaticon.com/svg/static/icons/svg/742/742745.svg' />`,
        category: ":*",
      },
    ];

    //Duy???t v??ng foreach c???a list icon ????? ki???m tra chu???i truy???n v??o c?? t???n t???i category kh??ng
    //N???u trong c??i chu???i string ???? c?? t???n t???i category c???a icon th?? n?? s??? replace th??nh th??? <image>
    icon.forEach((element) => {
      if (send.indexOf(element.category) > -1) {
        console.log("True");

        //Replace
        send = send.replace(element.category, element.image);
      }
    });

    return send;
  }
  useEffect(() => {
    console.log("load", load);
    if (load) {
      fetchData1();
      //
      const fetchData = async () => {
        let params;
        if (getGroupId() === 1) {
          params = {
            id_user1: userID1,
            id_user2: userID2,
          };
        } else {
          params = {
            id_user1: userID2,
            id_user2: userID1,
          };
        }

        const query = "?" + queryString.stringify(params);

        const response = await UserAPI.getAllMessage(query);
        console.log("res", response);

        setConversation(response.content);
      };

      fetchData();
    }

    setLoad(false);
  }, [load]);
  useEffect(() => {
    //Nh???n d??? li???u t??? server g???i l??n th??ng qua socket v???i key receive_message
    socket.on("receive_message", (data) => {
      //Sau ???? n?? s??? setLoad g???i l???i h??m useEffect l???y l???i d??? li???u
      setLoad(true);
    });
  }, []);

  const [emotion, setEmotion] = useState(false);
  const onClickEmotion = () => {
    setEmotion(!emotion);
  };
  const onClickIcon = (value) => {
    setSend(send + "" + value + " ");
  };
  return (
    <div className="app">
      <Row className="app-one">
        <Col sm={4} className="side">
          <div className="side-one">
            <ListUser listUser={listUser} GetUserID={GetUserID} />
          </div>
        </Col>
        <Col sm={8} className="conversation">
          <Row className="message" id="conversation">
            <Row className="message-previous">
              <Col sm={12} className="previous">
                {conversation &&
                  conversation.map((value) =>
                    value.category !== "send" ? (
                      <div className="message-main-sender">
                        <div className="sender">
                          <span className="message-time pull-right">B???n</span>
                          <div className="message-text">
                            {parse(value.message)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="message-main-receiver">
                        <div className="receiver">
                          <span className="message-time pull-right">
                            {value.name}
                          </span>
                          <div className="message-text">
                            {parse(value.message)}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                {loadMessage && (
                  <div className="wrapper_loading">
                    <div className="lds-ellipsis">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Row>
          {emotion && (
            <div className="show_icon">
              <div className="list_icon">
                <div className="icon" onClick={() => onClickIcon(":(")}>
                  <img
                    className="img_icon"
                    src="https://www.flaticon.com/svg/static/icons/svg/742/742760.svg"
                    alt=""
                  />
                </div>
                <div className="icon" onClick={() => onClickIcon("*_*")}>
                  <img
                    className="img_icon"
                    src="https://www.flaticon.com/svg/static/icons/svg/742/742750.svg"
                    alt=""
                  />
                </div>
                <div className="icon" onClick={() => onClickIcon(":)")}>
                  <img
                    className="img_icon"
                    src="https://www.flaticon.com/svg/static/icons/svg/742/742920.svg"
                    alt=""
                  />
                </div>
                <div className="icon" onClick={() => onClickIcon("T_T")}>
                  <img
                    className="img_icon"
                    src="https://www.flaticon.com/svg/static/icons/svg/742/742822.svg"
                    alt=""
                  />
                </div>
                <div className="icon" onClick={() => onClickIcon("-,-")}>
                  <img
                    className="img_icon"
                    src="https://www.flaticon.com/svg/static/icons/svg/742/742787.svg"
                    alt=""
                  />
                </div>
                <div className="icon" onClick={() => onClickIcon(":*")}>
                  <img
                    className="img_icon"
                    src="https://www.flaticon.com/svg/static/icons/svg/742/742745.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          )}
          <Row className="reply">
            <Col sm={1} xs={1} className="reply-emojis">
              <IconButton
                style={{ padding: "0", marginLeft: "15px" }}
                onClick={onClickEmotion}
              >
                <EmojiEmotionsIcon fontSize="large" className="icon-emojis" />
              </IconButton>
            </Col>
            <Col sm={10} xs={10} className="reply-main">
              <input
                className="form-control"
                type="text"
                value={send}
                onChange={onChangeSend}
              />
            </Col>
            <Col sm={1} xs={1} className="reply-send">
              <IconButton
                style={{ padding: "0", marginLeft: "15px" }}
                onClick={handlerSend}
              >
                <SendIcon fontSize="large" />
              </IconButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
