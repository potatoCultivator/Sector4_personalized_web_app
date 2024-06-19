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
import IconButton from '@mui/material/IconButton';
import { EditOutlined } from '@ant-design/icons';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTheme } from '@emotion/react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';
import React, { useState, useEffect, useRef } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { uploadList, fetchAllRows, updateRow } from '../backend';

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
    id: 'stat',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'regStat',
    align: 'right',
    disablePadding: false,
    label: 'Registration'
  }
  ,
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

function AttendeesStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'success';
      title = 'Paid';
      break;
    case 1:
      color = 'error';
      title = 'Unpaid';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
      {/* <Chip label={title} color={color} variant="outlined" size="small"/> */}
    </Stack>
  );
}

function RegistrationPayment({paymentStats})
{
  let payment;

  switch(paymentStats)
  {
    case 0:
      payment = 30
      break;
    case 1:
      payment = 50
      break;
    case 2:
      payment = 80
      break;
    case 3:
      payment = 100
      break;
    default:
      payment = 0
  }
  return(
    <>
      <NumericFormat value={payment} displayType="text" thousandSeparator prefix="₱" />
    </>
  )
}

// ==============================|| ORDER TABLE ||============================== //

export default function AttendeesTable({ attendeesStat }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('tracking_no');
  const [rows, setRows] = useState([]);
  const fileInputRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.addEventListener('change', handleFileChange);
    }
    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.removeEventListener('change', handleFileChange);
      }
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: function(results) {
      const newRows = results.data.map((row, index) => createData(index+1, row.church, row.name, row.acadStat, parseInt(row.stat), parseInt(row.regStat)));
      uploadList(newRows);
        setRows(newRows);
      }
    });
  };

  useEffect(() => {
    // Fetch data from Firebase
    const fetchData = async () => {
      const data = await fetchAllRows();
      setRows(data);
    };

    fetchData();

    // ...existing code...
  }, []);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
  <Box>
    <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    <Button onClick={() => fileInputRef.current.click()}>Import CSV</Button>
    <Button onClick={() => exportToCSV(rows)}>Export to CSV</Button>
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
          {stableSort(rows, getComparator(order, orderBy)).filter(row => attendeesStat === 2 ? row.stat == 0 || 1 : row.stat === attendeesStat).map((row, index) => {
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
                  <Link color="secondary"> {row.tracking_no}</Link>
                </TableCell>
                <TableCell>{row.church}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.acadStat}</TableCell>
                <TableCell>
                  <AttendeesStatus status={row.stat} />
                </TableCell>
                <TableCell align="right">
                  <RegistrationPayment paymentStats={row.regStat} />
                  {/* <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="$" /> */}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit" placement="top">
                    <IconButton color="black" onClick={handleOpen}>
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top">
                    <IconButton style={{ color: theme.palette.error.main }} onClick={() => handleEdit(row.tracking_no, newData)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>

    {/* Dialog goes here */}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Row</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To edit this row, please enter the new data here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        {/* Add more TextFields for other data */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => { handleEdit(row.tracking_no, newData); handleClose(); }}>Save</Button>
      </DialogActions>
    </Dialog>
  </Box>
);
}

AttendeesTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

AttendeesStatus.propTypes = { status: PropTypes.any };

RegistrationPayment.propTypes = { registration: PropTypes.any }

AttendeesTable.propTypes = { attendeesStat: PropTypes.any };