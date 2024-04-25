import {
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  useAddStdMutation,
  useGetStdQuery,
  useUpdateStdMutation,
} from "../api/apiSlice";
import { Link, useParams } from "react-router-dom";

const AddStd = () => {
  const { id } = useParams();
  const { data } = useGetStdQuery();
  const stdFilterData = data && data.filter((ele) => ele.id === id)[0];
  const [addStd] = useAddStdMutation();
  const [updateStd] = useUpdateStdMutation();

//   console.log(stdFilterData, "id");
  const [std_name, setStd_name] = useState(
    stdFilterData ? stdFilterData?.std_name : ""
  );
  const [std_standard, setStd_standard] = useState(
    stdFilterData ? stdFilterData?.std_standard : ""
  );
  const [completed, setCompleted] = useState(
    stdFilterData ? stdFilterData?.completed : false
  );
  const [std_age, setStd_age] = useState(
    stdFilterData ? stdFilterData?.std_age : ""
  );
  const [std_school_name, setStd_school_name] = useState(
    stdFilterData ? stdFilterData?.std_school_name : ""
  );

  const handleSubmit = () => {
    let stdData = {
      std_name,
      std_standard,
      completed,
      std_age,
      std_school_name,
    };
    // console.log(stdData, "stdData");
    if (id) {
      updateStd({
        ...stdData,
        id: stdFilterData?.id,
        std_id: stdFilterData?.std_id,
      });
    } else {
      addStd(stdData);
    }
  };
  return (
    <Box className="add-data-std">
      <Typography variant="h3">
        {id ? "Update Student Data" : "Add Student Data"}{" "}
      </Typography>
      <Box>
        <TextField
          label="Enter Name"
          variant="outlined"
          value={std_name}
          fullWidth
          size="small"
          onChange={(e) => setStd_name(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          label="Enter Standard"
          value={std_standard}
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setStd_standard(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          label="Enter Age"
          value={std_age}
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setStd_age(e.target.value)}
        />
      </Box>
      <FormControlLabel
        label="College/School is completed or not"
        required
        control={
          <Checkbox
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        }
      />
      <Box>
        <TextField
          //   id="outlined-basic"
          label="Enter School/College Name"
          value={std_school_name}
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setStd_school_name(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to={"/"}>
          <Button variant="contained" onClick={handleSubmit}>
            {id ? "Update" : "Submit"}
          </Button>
        </Link>
        {id && (
          <Link to={"/"}>
            <Button variant="contained" color="success">
              Go Back
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default AddStd;
