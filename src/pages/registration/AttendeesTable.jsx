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

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

function createData(tracking_no, name, fat, carbs, protein) {
  return { tracking_no, name, fat, carbs, protein };
}

// const rows = [
//   createData(84564564, 'Camera Lens', 40, 2, 40570),
//   createData(98764564, 'Laptop', 300, 0, 180139),
//   createData(98756325, 'Mobile', 355, 1, 90989),
//   createData(98652366, 'Handset', 50, 1, 10239),
//   createData(13286564, 'Computer Accessories', 100, 1, 83348),
//   createData(86739658, 'TV', 99, 0, 410780),
//   createData(13256498, 'Keyboard', 125, 2, 70999),
//   createData(98753263, 'Mouse', 89, 2, 10570),
//   createData(98753275, 'Desktop', 185, 1, 98063),
//   createData(98753291, 'Chair', 100, 0, 14001)
// ];

const rows = [
  createData('Christ Baptist Mission Gacat', 'Jana Gian Mazo', 'College', 2, 2),
  createData('Christ Baptist Mission Gacat', 'Shanelle Mazo', 'HighSchool', 0, 1),
  createData('Christ Baptist Mission Gacat', 'Geselle Joy Mazo', 'HighSchool', 1, 1),
  createData('Christ Baptist Mission Gacat', 'Cyrome Caraan', 'HighSchool', 1, 1),
  createData('Christ Baptist Mission Gacat', 'Janelle Divya Mazo', 'HighSchool', 1, 1),
  createData('Christ Baptist Mission San Agustin', 'Maria Regina Carmelotes', 'HighSchool', 0, 1),
  createData('Christ Baptist Mission San Agustin', 'Harzelynne Torres', 'HighSchool', 2, 2),
  createData('Christ Baptist Mission San Agustin', 'Joel John Argallon', 'HighSchool', 2, 1),
  createData('Christ Baptist Mission San Agustin', 'Riclyn Argallon', 'College', 1, 2),
  createData('Christ Baptist Mission San Agustin', 'Randall John Argallon', 'HighSchool', 0, 1)
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
    label: 'Church'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'Academic Status'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Registration'
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
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary"> {row.tracking_no}</Link>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell>
                    <AttendeesStatus status={row.carbs} />
                  </TableCell>
                  <TableCell align="right">
                    <RegistrationPayment paymentStats={row.protein} />
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
