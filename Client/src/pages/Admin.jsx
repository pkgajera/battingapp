import React, { useEffect, useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses, Modal, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from '../context/AllContext';
import axios from 'axios';
import { toast } from 'react-toastify'

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const styleForModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '50%' }, // Responsive width
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const Admin = () => {

  const { getAllAdmin, Authorization, allAdmin } = useAuth();

  const adminObj = {
    username: '',
    email: '',
    password: '',
    phone: '',
    website: '',
    webLogo: ''
  }

  const [admin, setAdmin] = useState(adminObj);
  const [modelOpen, setModelOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [adminData, setAdminData] = useState(adminObj)

  const handleAdminDetailsChange = (e) => {
    const { name, value } = e.target;
    if (updateId) {
      setAdmin({ ...admin, [name]: value });
    } else {
      setAdminData({ ...adminData, [name]: value });
    }
  }

  const handleWebLogoChange = (e) => {
    if (updateId) {
      setAdmin({ ...admin, webLogo: e.target.files[0] });
    } else {
      setAdminData({
        ...adminData, webLogo: e.target.files[0]
      })
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('username', adminData.username);
    formData.append('email', adminData.email);
    formData.append('password', adminData.password);
    formData.append('phone', adminData.phone);
    formData.append('website', adminData.website);
    formData.append('webLogo', adminData.webLogo);

    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': Authorization
      }
    });

    if (response.data.status) {
      toast.success(response.data.message);
      setModelOpen(false);
      getAllAdmin();
      setAdminData(adminObj);
      getAllAdmin();
    } else {
      toast.error(response.data.message);
    }
  }

  const setUpdate = async (id) => {
    setModelOpen(true);
    setUpdateId(id);

    const adminData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/getSingle/${id}`, {
      headers: {
        'Authorization': Authorization
      }
    });

    if (adminData.data.status) {
      setAdmin(adminData.data.data)
    }
  }

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('username', admin.username);
    formData.append('email', admin.email);
    formData.append('phone', admin.phone);
    formData.append('website', admin.website);

    if (admin.password) {
      formData.append('password', admin.password);
    }
    if (admin.webLogo) {
      formData.append('webLogo', admin.webLogo);
    }

    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/update/${updateId}`, formData, {
      headers: {
        'Authorization': Authorization
      }
    })

    if (response.data.status) {
      toast.success(response.data.message);
      setModelOpen(false);
      getAllAdmin();
      setAdminData(adminObj);
      setAdmin(adminObj);
      setUpdateId("");
    } else {
      toast.error(response.data.message);
    }
  }

  const deleteAdmin = async (id) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/delete/${id}`, {}, {
        headers: {
          'Authorization': Authorization,
        }
      })

      console.log(response);

      if (response.data.status) {
        toast.success(response.data.message);
        getAllAdmin();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error while deleting admin");
    }
  }

  useEffect(() => {
    getAllAdmin()
  }, [])

  return (
    <>
      <div className="container flex flex-col">
        <div className='px-5 sm:px-0 py-4 flex flex-wrap justify-between items-center '>
          <h2 className='font-semibold text-xl'>Admins</h2>
          <Button variant='contained' color='secondary' startIcon={<IoIosAddCircle />} sx={{ backgroundColor: 'secondary' }} onClick={() => setModelOpen(true)}>Add Admin</Button>
        </div>
        {
          allAdmin.length > 0 ?
            <div className='px-5 sm:px-0'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>No</StyledTableCell>
                      <StyledTableCell align="left">Username</StyledTableCell>
                      <StyledTableCell align="left">Email</StyledTableCell>
                      <StyledTableCell align="left">Phone</StyledTableCell>
                      <StyledTableCell align="left">Website</StyledTableCell>
                      <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allAdmin?.map((val, ind) => (
                      <StyledTableRow key={ind}>
                        <StyledTableCell component="th" scope="row">
                          {ind + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">{val.username}</StyledTableCell>
                        <StyledTableCell align="left">{val.email}</StyledTableCell>
                        <StyledTableCell align="left">{val.phone}</StyledTableCell>
                        <StyledTableCell align="left">{val.website}</StyledTableCell>
                        <StyledTableCell align="left">
                          <div className='flex justify-start items-center gap-2'>
                            <button onClick={() => setUpdate(val._id)}>
                              <TbEdit fontSize={22} className='hover:text-green-600' title='Edit' />
                            </button>
                            <button onClick={() => deleteAdmin(val._id)}>
                              <MdDeleteOutline fontSize={22} className='hover:text-red-600' title='Delete' />
                            </button>
                            <button>
                              <BsThreeDotsVertical fontSize={22} className='hover:text-blue-600' title='More Details' />
                            </button>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            : <p className='text-center text-xl'>No Any Admins . Click Add Admin to add</p>
        }
        <Modal
          open={modelOpen}
          onClose={() => setModelOpen(false)}
          aria-labelledby="responsive-modal-title"
          aria-describedby="responsive-modal-description"
        >
          <Box sx={styleForModal}>
            <Typography id="responsive-modal-title" variant="h4" component="h2" align='center'>
              {updateId ? "Update" : "Add"} Admin
            </Typography>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>
              <div className='w-full'>
                <input
                  type="text"
                  name='username'
                  placeholder='Username'
                  className='w-full border-[1px] border-black rounded-lg p-1 px-2'
                  value={updateId ? admin.username : adminData.username}
                  onChange={handleAdminDetailsChange}
                />
              </div>
              <div className='w-full'>
                <input
                  type="text"
                  name='email'
                  placeholder='Email'
                  className='w-full border-[1px] border-black rounded-lg p-1 px-2'
                  value={updateId ? admin.email : adminData.email}
                  onChange={handleAdminDetailsChange}
                />
              </div>
              <div className='w-full'>
                <input
                  type="text"
                  name='phone'
                  placeholder='Phone Number'
                  className='w-full border-[1px] border-black rounded-lg p-1 px-2'
                  value={updateId ? admin.phone : adminData.phone}
                  onChange={handleAdminDetailsChange}
                />
              </div>
              <div className='w-full'>
                <input
                  type="password"
                  name='password'
                  placeholder='Password'
                  className='w-full border-[1px] border-black rounded-lg p-1 px-2'
                  value={updateId ? admin.password : adminData.password}
                  onChange={handleAdminDetailsChange}
                />
              </div>
            </div>
            <input
              type="text"
              name='website'
              placeholder='Enter Website'
              className='w-full border-[1px] border-black rounded-lg p-1 px-2 mt-3'
              value={updateId ? admin.website : adminData.website}
              onChange={handleAdminDetailsChange}
            />
            <input
              type="file"
              accept='image/*'
              className='w-full border-[1px] border-black rounded-lg p-2 mt-3'
              onChange={handleWebLogoChange}
            />
            <div className='flex justify-end items-center gap-5'>
              <Button variant="contained" color='secondary' onClick={() => { setModelOpen(false); setUpdateId("") }} sx={{ mt: 2 }}>
                Close
              </Button>
              {
                updateId ?
                  <Button variant="contained" color='success' onClick={handleUpdate} sx={{ mt: 2 }}>
                    Update
                  </Button> :
                  <Button variant="contained" color='success' onClick={handleSubmit} sx={{ mt: 2 }}>
                    Submit
                  </Button>
              }
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default Admin