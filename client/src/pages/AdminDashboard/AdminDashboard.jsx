import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Divider,
} from "@mui/material/";
import { useState,useEffect } from "react";
import baseApi from "../../services/axiosHelper";
import { MdDeleteForever } from "react-icons/md";
import ModeIcon from "@mui/icons-material/Mode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [role ] = useState('');
  const navigation = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await baseApi.get("/users");
      setUsersData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() =>{
  fetchUsers();
  },[])

  const handleDeleteUser = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this User?")) {
      await baseApi.delete(`/users/${id}`);
      const newUsersData = usersData.filter((user) => user._id!== id);
      setUsersData(newUsersData);
      toast.success(
          "✔ Delete Successfully "
        ,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async (id) =>{
  navigation(`${ROUTES.ADMIN_UPDATE_USER}/${id}`);
  }
  
    const handleUpdateRoleUser = async (e, id) => {
      try {
        const role = e.target.value
        if (role === "isAdmin") {
          await baseApi.patch(`/users/patch/${id}`, { isAdmin: true });
        } else if (role === "isBusiness") {
          await baseApi.patch(`/users/${id}`, { isBusiness: true });
        } else if (role === "normalUser") {
          await baseApi.patch(`/users/${id}`, { isBusiness: false });
          await baseApi.patch(`/users/patch/${id}`, { isAdmin: false });
        }
        toast.success("✔ Update Role Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Typography
        variant="h3"
        color="gray.500"
        textAlign={"center"}
        fontFamily={"Lora"}
        fontWeight={500}
        sx={{ my: 4 }}
      >
        Admin Dashboard
        <Divider />
        <Typography variant="body1" color="gray.500">
          Welcome to the Dashboard page! Here, you can perform various
          management actions on users of the website. The page displays a
          convenient and consolidated list of all users in a table format,
          allowing you to perform the following actions:
          <br /> Delete User: By clicking on the delete icon, you can remove a
          user from the system. After confirmation, the user will be permanently
          removed from the list. <br /> Update Details: You can update user
          details, including address, email, and more. Simply click on the edit
          icon and modify the details as desired.
          <br /> Update User Status: The page allows you to change the status of
          the user, such as setting them as an admin, regular user, or business
          user. Simply select the desired status from the dropdown list.
        </Typography>
      </Typography>
      <TableContainer component={Paper} sx={{ my: 10 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="right">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((row) => (
              <StyledTableRow key={row.name + row._id} id={row._id}>
                <StyledTableCell component="th" scope="row">
                  <img src={row.image.url} alt={row.image.alt} width={25} />{" "}
                  {row.name.first} {row.name.last}
                </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell align="left">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {row.isAdmin
                          ? "isAdmin"
                          : row.isBusiness
                          ? "isBusiness"
                          : "normalUser"}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id={row._id}
                        value={role}
                        label="Role"
                        onChange={(e) => handleUpdateRoleUser(e, row._id)}
                      >
                        <MenuItem value={"isAdmin"}>isAdmin</MenuItem>
                        <MenuItem value={"isBusiness"}>isBusiness</MenuItem>
                        <MenuItem value={"normalUser"}>normalUser</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.address.country} {row.address.city}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    aria-label=""
                    onClick={() => handleUpdateUser(row._id)}
                  >
                    <ModeIcon />
                  </IconButton>
                  <IconButton
                    aria-label=""
                    onClick={() => handleDeleteUser(row._id)}
                  >
                    <MdDeleteForever />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminDashboard;
