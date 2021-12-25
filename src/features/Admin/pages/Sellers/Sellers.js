import React, { useEffect } from "react";
import adminApi from "../../../../api/adminApi";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function Customer() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Tên", field: "name" },
      { title: "Email", field: "email" },
      { title: "Sđt", field: "phone" },
      { title: "Địa chỉ", field: "address" },
      {
        title: "Status",
        field: "status",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
      },
    ],
    data: [],
  });
  async function handleClick(row) {
    const { email, status } = row;
    const params = {
      email,
      status,
    };
    await adminApi.changeStatus(params);
    const response = await adminApi.get({ groupid: 2 });
    console.log("res1", response);
    var users = [];
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].status === 0) var Status = "Đã bị ban";
      else Status = "Đang hoạt động";
      const result = {
        name: response.data[i].name,
        email: response.data[i].email,
        phone: response.data[i].phone,
        address: response.data[i].address,
        status: Status,
      };
      users.push(result);
    }
    setState({
      columns: [
        { title: "Tên", field: "name" },
        { title: "Email", field: "email" },
        { title: "Sđt", field: "phone" },
        { title: "Địa chỉ", field: "address" },
        {
          title: "Status",
          field: "status",
        },
      ],
      data: users,
    });
  }
  useEffect(() => {
    // execute after first render
    (async () => {
      try {
        let params = {
          groupid: 2,
        };
        const response = await adminApi.get(params);
        var users = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].status === 0) var status = "Đã bị ban";
          else status = "Đang hoạt động";
          const result = {
            name: response.data[i].name,
            email: response.data[i].email,
            phone: response.data[i].phone,
            address: response.data[i].address,
            status: status,
          };

          users.push(result);
        }
        setState({
          columns: [
            { title: "Tên", field: "name" },
            { title: "Email", field: "email" },
            { title: "Sđt", field: "phone" },
            { title: "Địa chỉ", field: "address" },
            {
              title: "Status",
              field: "status",
            },
          ],
          data: users,
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
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#01579b" }}>
              <TableCell style={{ color: "#FFF" }}>Hành động</TableCell>
              <TableCell style={{ color: "#FFF" }}>Tên</TableCell>
              <TableCell style={{ color: "#FFF" }} align="right">
                Email
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="right">
                Số điện thoại
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="right">
                Địa chỉ
              </TableCell>
              <TableCell style={{ color: "#FFF" }} align="right">
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((row) => (
              <TableRow key={row.name}>
                <TableCell style={{ backgroundColor: "#FFF" }}>
                  {" "}
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => handleClick(row)}
                  >
                    Cập nhật trạng thái
                  </Button>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ backgroundColor: "#FFF" }}
                >
                  {row.name}
                </TableCell>
                <TableCell style={{ backgroundColor: "#FFF" }} align="right">
                  {row.email}
                </TableCell>
                <TableCell style={{ backgroundColor: "#FFF" }} align="right">
                  {row.phone}
                </TableCell>
                <TableCell style={{ backgroundColor: "#FFF" }} align="right">
                  {row.address}
                </TableCell>
                <TableCell style={{ backgroundColor: "#FFF" }} align="right">
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
