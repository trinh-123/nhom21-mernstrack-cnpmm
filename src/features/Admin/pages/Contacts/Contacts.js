import React, { useEffect } from "react";
import MaterialTable from "material-table";
import adminApi from "../../../../api/adminApi";

export default function Contacts() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Tên", field: "name" },
      { title: "Email", field: "email" },
      { title: "SĐT", field: "phone" },
      { title: "Địa chỉ", field: "address" },
      { title: "Nội dung", field: "content" },
    ],
    data: [],
  });

  useEffect(() => {
    // execute after first render
    (async () => {
      try {
        const response = await adminApi.getContacts();
        console.log("rs", response);
        var contacts = [];
        for (let i = 0; i < response.contacts.length; i++) {
          console.log(response.contacts[i]);
          const result = {
            id: response.contacts[i]._id,
            name: response.contacts[i].name,
            email: response.contacts[i].email,
            phone: response.contacts[i].phone,
            address: response.contacts[i].address,
            content: response.contacts[i].content,
          };
          console.log(result);
          contacts.push(result);
        }
        setState({
          columns: [
            { title: "Tên", field: "name" },
            { title: "Email", field: "email" },
            { title: "SĐT", field: "phone" },
            { title: "Địa chỉ", field: "address" },
            { title: "Nội dung", field: "content" },
          ],
          data: contacts,
        });
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
    return () => {
      // execute when unmount
    };
  }, []);

  return (
    <div>
      {/* <ShirtsToolbar /> */}
      <MaterialTable
        options={{
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
          rowStyle: {
            backgroundColor: "#EEE",
            marginLeft: "50px",
          },
        }}
        title="Quản lý liên hệ"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  console.log("id", oldData.id);
                  let id = oldData.id;
                  let params = {
                    id,
                  };
                  adminApi.deleteContact(params);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
}
