import React, { useEffect } from "react";
import MaterialTable from "material-table";
import shirtsApi from "../../../../api/shirtsApi";

export default function Books() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Tên", field: "name" },
      { title: "Mô tả ", field: "detail" },
      { title: "Số lượng", field: "quantity" },
      { title: "Giá", field: "price" },
    ],
    data: [],
  });

  useEffect(() => {
    // execute after first render
    (async () => {
      try {
        // let params = {
        //     sellerId:getUserId(),
        // };
        // console.log("sellerID",params.sellerId);
        const response = await shirtsApi.getAll();
        // console.log(response.length)
        // let action = await getBooksSeller(response);
        // let resDispatch = dispatch(action);
        var shirts = [];
        for (let i = 0; i < response.length; i++) {
          console.log(response[i]);
          const result = {
            id: response[i]._id,
            name: response[i].name,
            detail: response[i].detail,
            quantity: response[i].quantity,
            price: response[i].price,
          };
          console.log(result);
          shirts.push(result);
        }
        setState({
          columns: [
            { title: "Tên", field: "name" },
            { title: "Mô tả ", field: "detail" },
            { title: "Số lượng", field: "quantity" },
            { title: "Giá", field: "price" },
          ],
          data: shirts,
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
        title="Quản lý sản phẩm"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;

                    let params = {
                      _id: newData.id,
                      quantity: newData.quantity,
                      price: newData.price,
                      detail: newData.detail,
                      name: newData.name,
                    };
                    shirtsApi.update(params);
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  let name = oldData.name;
                  let params = {
                    name,
                  };
                  const response = shirtsApi.delete(params);
                  console.log(response);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
}
