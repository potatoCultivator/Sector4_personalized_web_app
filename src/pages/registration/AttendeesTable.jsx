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
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { EditOutlined } from '@ant-design/icons';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTheme } from '@emotion/react';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

// function createData(tracking_no, name, fat, carbs, protein) {
//   return { tracking_no, name, fat, carbs, protein };
// }

function createData(tracking_no,church ,name, acadStat, stat, regStat) {
  return { tracking_no,church ,name, acadStat, stat, regStat };
}

const rows = [
  createData(1, 'Christ Baptist Mission Gacat', 'Jana Gian Mazo', 'College', 2, 2),
  createData(2, 'Christ Baptist Mission Gacat', 'Shanelle Mazo', 'HighSchool', 0, 1),
  createData(3, 'Christ Baptist Mission Gacat', 'Geselle Joy Mazo', 'HighSchool', 1, 1),
  createData(4, 'Christ Baptist Mission Gacat', 'Cyrome Caraan', 'HighSchool', 1, 1),
  createData(5, 'Christ Baptist Mission Gacat', 'Janelle Divya Mazo', 'HighSchool', 1, 1),
  createData(6, 'Christ Baptist Mission San Agustin', 'Maria Regina Carmelotes', 'HighSchool', 0, 1),
  createData(7, 'Christ Baptist Mission San Agustin', 'Harzelynne Torres', 'HighSchool', 2, 2),
  createData(8, 'Christ Baptist Mission San Agustin', 'Joel John Argallon', 'HighSchool', 2, 1),
  createData(9, 'Christ Baptist Mission San Agustin', 'Riclyn Argallon', 'College', 1, 2),
  createData(10, 'Christ Baptist Mission San Agustin', 'Randall John Argallon', 'HighSchool', 0, 1)
];

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
    align: 'left',
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

function AttendeesTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
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

export default function AttendeesTable() {
  const order = 'asc';
  const orderBy = 'tracking_no';
  const theme = useTheme();

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
          <AttendeesTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
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
                  <TableCell>{row.name}</TableCell>
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
                      <IconButton color="black" onClick={() => { console.log("Edit button clicked"); }}>
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top">
                      <IconButton style={{ color: theme.palette.error.main }} onClick={() => { console.log("Delete button clicked"); }}>
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
    </Box>
  );
}

AttendeesTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

AttendeesStatus.propTypes = { status: PropTypes.any };

RegistrationPayment.propTypes = { registration: PropTypes.any }
