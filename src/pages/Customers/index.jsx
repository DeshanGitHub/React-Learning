import React, { Component, Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import GDSEButton from "../../components/Common/Button";
import CustomerService from "../../service/CustomerService";
import GDSESnackBar from "../../components/Common/SnackBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        id: "",
        name: "",
        address: "",
        salary: "",
      },
      alert: false,
      message: "",
      severity: "",

      data: [],
      btnLabel: "save",
      btnColor: "primary",
    };
  }

  deleteCustomer = async (id) => {
    let params = {
      id: id,
    };
    let res = await CustomerService.deleteCustomer(params);

    if (res.status === 200) {
      this.setState({
        alert: true,
        message: res.data.message,
        severity: "success",
      });
      this.loadData();
    } else {
      this.setState({
        alert: true,
        message: res.data.message,
        severity: "error",
      });
    }
  };

  updateCustomer = (data) => {
    console.log(data);

    this.setState({
      btnLabel: "update",
      btnColor: "secondary",
      formData: {
        id: data.id,
        name: data.name,
        address: data.address,
        salary: data.salary,
      },
    });
  };

  // ------- React Map function example -------
  exampleForMap = () => {
    this.state.data.map((value, index) => {
      //console.log(value); // access element one by one
    });
  };

  clearFields = () => {
    this.setState({
      formData: {
        id: "",
        name: "",
        address: "",
        salary: "",
      },
    });
  };

  loadData = async () => {
    let res = await CustomerService.fetchCustomer();

    if (res.status === 200) {
      //print getted data on console
      console.log(res);

      this.setState({
        data: res.data.data,
      });
    } else {
      console.log("Deshan Error");
    }

    console.log(this.state.data); // print customers array

    this.exampleForMap();
  };

  submitCustomer = async () => {
    let formData = this.state.formData;
    if (this.state.btnLabel === "save") {
      let res = await CustomerService.postCustomer(formData);

      console.log(res); //print the promise

      if (res.status === 201) {
        this.setState({
          alert: true,
          message: res.data.message,
          severity: "success",
        });
        this.clearFields();
        this.loadData();
      } else {
        this.setState({
          alert: true,
          message: res.response.data.message,
          severity: "error",
        });
      }
    } else {
      let res = await CustomerService.putCustomer(formData);
      if (res.status === 200) {
        this.setState({
          alert: true,
          message: res.data.message,
          severity: "success",
          btnLabel: "save",
          btnColor: "primary",
        });
        this.clearFields();
        this.loadData();
      } else {
        this.setState({
          alert: true,
          message: res.response.data.message,
          severity: "error",
        });
      }
    }
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      // <Fragment>
      <>
        <ValidatorForm
          ref="form"
          className="pt-2"
          onSubmit={this.submitCustomer}
        >
          <Grid container className="pt-2" spacing={3}>
            <Grid item lg={12} xs={12} sm={12} md={12}>
              <Typography variant="h2">Customer Manage</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant="subtitle1">Customer Id</Typography>
              <TextValidator
                id="outlinedbasic"
                placeholder="Customer Id"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={this.state.formData.id}
                onChange={(e) => {
                  let formData = this.state.formData;
                  formData.id = e.target.value;
                  this.setState({ formData });
                }}
                validators={["required"]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant="subtitle1">Customer Name</Typography>
              <TextValidator
                id="outlinedbasic"
                placeholder="Customer Name"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={this.state.formData.name}
                onChange={(e) => {
                  let formData = this.state.formData;
                  formData.name = e.target.value;
                  this.setState({ formData });
                }}
                validators={["required"]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant="subtitle1">Customer Address</Typography>
              <TextValidator
                id="outlinedbasic"
                placeholder="Customer Address"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={this.state.formData.address}
                onChange={(e) => {
                  let formData = this.state.formData;
                  formData.address = e.target.value;
                  this.setState({ formData });
                }}
                validators={["required"]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant="subtitle1">Customer Salary</Typography>
              <TextValidator
                id="outlinedbasic"
                placeholder="Customer Salary"
                variant="outlined"
                size="small"
                style={{ width: "100%" }}
                value={this.state.formData.salary}
                onChange={(e) => {
                  let formData = this.state.formData;
                  formData.salary = e.target.value;
                  this.setState({ formData });
                }}
                validators={["required"]}
              />
            </Grid>
            <Grid
              container
              style={{ marginTop: "10px" }}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <GDSEButton
                label={this.state.btnLabel}
                type="submit"
                size="small"
                color={this.state.btnColor}
                variant="contained"
              />
            </Grid>
          </Grid>
        </ValidatorForm>

        <Grid contaner style={{ marginTop: "15px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customer table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Customer Id</TableCell>
                  <TableCell align="left">Customer Name</TableCell>
                  <TableCell align="left">Customer Address</TableCell>
                  <TableCell align="left">Customer Salary</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map((row) => (
                  <TableRow>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.salary}</TableCell>
                    <TableCell align="left">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => {
                            console.log("edit icon clicked!");
                            this.updateCustomer(row);
                          }}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => {
                            this.deleteCustomer(row.id);
                          }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <GDSESnackBar
          open={this.state.alert}
          onClose={() => {
            this.setState({ alert: false });
          }}
          message={this.state.message}
          autoHideDuration={3000}
          severity={this.state.severity}
          variant="filled"
        />
      </>
      // </Fragment>
    );
  }
}

export default Customer;
