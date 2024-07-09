import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
import { EditOutlined } from '@ant-design/icons';
// import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTheme } from '@emotion/react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import React, { useState, useEffect, useRef } from 'react';
// import Button from '@mui/material/Button';
import RegisterIcon from '@mui/icons-material/HowToReg';
import { Button, IconButton, Menu, MenuItem, Tooltip, Dialog, DialogTitle, DialogActions } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { fetchAllRows, updateRow, deleteRow } from '../backend';
import EditAttendeeInfo from './editInfo';

import { useNavigate } from 'react-router-dom'; 

// ===========================||  Functions ||=========================== //

async function handleEdit(tracking_no, newData) {
  // Update the row in the state
  const newRows = rows.map(row => row.tracking_no === tracking_no ? newData : row);
  setRows(newRows);

  // Update the row in the backend
  await updateRow(tracking_no, newData);
}

function exportToCSV(rows) {
  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'Attendees.csv');
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'tracking_no',
    align: 'center',
    disablePadding: false,
    label: 'Number'
  },
  {
    id: 'church',
    align: 'left',
    disablePadding: true,
    label: 'Church'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'acadStat',
    align: 'right',
    disablePadding: false,
    label: 'Academic Status'
  },
  {
    id: 'action',
    align: 'center',
    disablePadding: false,
    label: 'Action'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function AttendeesTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            onClick={headCell.id !== 'action' ? createSortHandler(headCell.id) : undefined}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span">
                {order === 'desc' ? ' 🔽' : ' 🔼'}
              </Box>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function AttendeesTable({ attendeesStat }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('tracking_no');
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  
  const handleClose1 = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const navigate = useNavigate();
    // Inside your component, before the return statement, add state to manage the new dialog
    const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);

    // Function to handle opening the register dialog
    const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
    };

    // Function to handle closing the register dialog
    const handleCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
    };

    // Function to handle the confirmation of registration
    const handleConfirmRegistration = () => {
    // Implement registration logic here
    console.log("Registration confirmed");
    handleCloseRegisterDialog();
    };


  useEffect(() => {
    // Fetch data from Firebase
    const fetchData = async () => {
      const data = await fetchAllRows();
      setRows(data);
    };
    fetchData();
  }, []);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };



  const handleOpen = (row) => {
    setCurrentRow(row);
    setOpen(true);
  };

  const handleClose = async () => {
  setOpen(false);
  // Refetch data from Firebase
  const data = await fetchAllRows();
  setRows(data);
};


// Add a state to manage the open/close state of the confirmation dialog
const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
// Add a state to keep track of the row to be deleted
const [rowToDelete, setRowToDelete] = useState(null);

// Function to open the delete confirmation dialog
const handleDeleteClick = (row) => {
  setRowToDelete(row);
  setOpenDeleteDialog(true);
};

// Function to close the delete confirmation dialog
const handleCloseDeleteDialog = () => {
  setOpenDeleteDialog(false);
};

// Function to confirm deletion
const handleConfirmDelete = async () => {
  await deleteRow(rowToDelete.id);
  // Refetch data from Firebase or remove the row from the local state
  const updatedRows = rows.filter(row => row.id !== rowToDelete.id);
  setRows(updatedRows);
  // Close the dialog
  handleCloseDeleteDialog();
  navigate(0, { replace: true }); 
};



  return (
  <Box>
    <TableContainer
      sx={{
        width: '100%',
        overflowX: 'auto',
        position: 'relative',
        display: 'block',
        maxWidth: '100%',
        '& td, & th': { whiteSpace: 'nowrap' }
      }}
    >
      <Table aria-labelledby="tableTitle">
      <AttendeesTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).filter(row => row.stat).map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                tabIndex={-1}
                key={row.tracking_no}
              >
                <TableCell align="center" component="th" id={labelId} scope="row">
                  <Link color="secondary"> {index + 1}</Link>
                </TableCell>
                <TableCell>{row.church}</TableCell>
                <TableCell align="left">{row.firstname + ' ' + row.lastname}</TableCell>
                <TableCell align="right">{row.acadStat}</TableCell>
                <TableCell align="center">
                    <Tooltip title="More options" placement="top">
                        <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        >
                        <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                        'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleClose1}
                        PaperProps={{
                        style: {
                            maxHeight: 48 * 4.5,
                            width: '20ch',
                        },
                        }}
                    >
                        <MenuItem onClick={() => { handleOpen(row); handleClose1(); }}>
                        <EditOutlined fontSize="small" /> Edit
                        </MenuItem>
                        <MenuItem onClick={() => { handleDeleteClick(row); handleClose1(); }}>
                        <DeleteOutlineIcon fontSize="small" style={{ color: theme.palette.error.main }} /> Delete
                        </MenuItem>
                        <MenuItem onClick={() => { handleOpenRegisterDialog(); handleClose1(); }}>
                        <RegisterIcon fontSize="small" /> Register
                        </MenuItem>
                    </Menu>
                    </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>

    {/* Dialog goes here */}
    <Dialog open={open} onClose={handleClose}>
      <EditAttendeeInfo row={currentRow} />
    </Dialog>

    <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
    <DialogTitle>{"Are you sure you want to delete this row?"}</DialogTitle>
    <DialogActions>
      <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
      <Button onClick={handleConfirmDelete} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>

  <Dialog open={openRegisterDialog} onClose={handleCloseRegisterDialog}>
    <DialogTitle>{"Do you really want to register this member?"}</DialogTitle>
    <DialogActions>
      <Button onClick={handleCloseRegisterDialog}>Cancel</Button>
      <Button onClick={handleConfirmRegistration} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
  
  </Box>
);
}

AttendeesTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

AttendeesTable.propTypes = { attendeesStat: PropTypes.any };