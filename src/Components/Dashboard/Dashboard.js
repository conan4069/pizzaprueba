import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import Icon from '@material-ui/core/Icon';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const orders = [
  { name: 'Margarita', size: 'Median', quantity: 1, adds: 'American Cheese', state: 'pending' },
  { name: 'Diavola', size: 'Small', quantity: 1, adds: '', state: 'pending' },
  { name: 'Primavera', size: 'Median', quantity: 1, adds: '', state: 'pending' },
  { name: 'Funghi', size: 'Big', quantity: 1, adds: '', state: 'pending' },
  { name: 'Prosciutto', size: 'Big', quantity: 1, adds: 'Pepperoni', state: 'pending' },
  { name: 'Calzone', size: 'Median', quantity: 1, adds: 'Bacon', state: 'pending' },
  { name: 'Four Seasons', size: 'Small', quantity: 1, adds: '', state: 'pending' },
  { name: 'Four Cheeses', size: 'Median', quantity: 1, adds: '', state: 'pending' },
  { name: 'Carbonara', size: 'Small', quantity: 1, adds: '', state: 'pending' },
  { name: 'Barbacoa', size: 'Median', quantity: 1, adds: 'Bacon', state: 'pending' },
  { name: 'Vegetarian', size: 'Small', quantity: 1, adds: 'Pepperoni', state: 'pending' },
  { name: 'Capricious', size: 'Median', quantity: 1, adds: 'American Cheese', state: 'pending' },
]

const headers = [
  { name: 'Item', align: '' },
  { name: 'Size', align: 'right' },
  { name: 'Quantity', align: 'right' },
  { name: 'Adds', align: 'right' },
  { name: 'Status', align: 'right' },
  { name: 'Actions', align: 'center' },
]

function OrdersTable() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell align={header.align}>{header.name}</TableCell>
            ))}
          </TableRow>

        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : orders
          ).map((order) => (
            <TableRow key={order.name}>
              <TableCell component="th" scope="row">
                {order.name}
              </TableCell>
              <TableCell align="right">{order.size}</TableCell>
              <TableCell align="right">{order.quantity}</TableCell>
              <TableCell align="right">{order.adds}</TableCell>
              <TableCell align="right">{order.state}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="last page"
                >
                  <Icon className="fa fa-eye" />
                </IconButton>
                <IconButton
                  aria-label="last page"
                >
                  <Icon className="fa fa-check" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'orders per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <Icon className="fa fa-step-forward" /> : <Icon className="fa fa-step-backward" />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <Icon className="fa fa-chevron-right" /> : <Icon className="fa fa-chevron-left" />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <Icon className="fa fa-chevron-left" /> : <Icon className="fa fa-chevron-right" />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <Icon className="fa fa-step-backward" /> : <Icon className="fa fa-step-forward" />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function OrdersCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            O
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Icon className="fa fa-plus" />
          </IconButton>
        }
        title="Orders"
      // subheader="September 14, 2016"
      />
      <CardContent>
        <OrdersTable />
      </CardContent>
    </Card>
  );
}

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
