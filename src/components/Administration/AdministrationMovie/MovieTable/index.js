import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
  TableSortLabel as MuiTableSortLabel,
  Paper as MuiPaper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  AddOutlined as AddIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";

import MovieDialogEdit from "./MovieDialogEdit";
import MovieDialogDelete from "./MovieDialogDelete";

const headCells = [
  {
    id: "title",
    label: "Title",
    isSorted: true,
  },
  {
    id: "produced_by",
    label: "Produced by",
    isSorted: true,
  },
  {
    id: "genre",
    label: "Genre",
    isSorted: false,
  },
  {
    id: "release_date",
    label: "Release date",
    isSorted: true,
  },
  {
    id: "created_by",
    label: "Created by",
    isSorted: true,
  },
];

const AddButtonIcon = styled(IconButton)`
  background-color: white;
  color: ${(props) => props.theme.palette.primary.main};

  :hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const ComponentContainer = styled.div`
  width: 100%;
`;

const Paper = styled(MuiPaper)`
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
`;

const Table = styled(MuiTable)`
  min-width: 650px;
`;

const PaginationActionContainer = styled.div`
  flex-shrink: 0;
  margin-left: ${(props) => props.theme.spacing(2.5)}px;
`;

const HeaderTableCell = styled(TableCell)`
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
`;

const TableSortLabel = styled(MuiTableSortLabel)`
  &.MuiTableSortLabel-active {
    color: ${(props) => props.theme.palette.primary.contrastText};
  }

  &:hover {
    color: ${(props) => props.theme.palette.primary.contrastText};
  }

  &:hover .MuiTableSortLabel-icon {
    color: ${(props) =>
      props.active
        ? props.theme.palette.primary.contrastText
        : "rgba(255,255,255,0.5)"} !important;
  }

  .MuiTableSortLabel-icon {
    color: rgba(255, 255, 255, 0.7) !important;
  }
`;

const SelectedTableRow = styled(TableRow)`
  height: 53px;
`;

const MovieTableHead = (props) => {
  const { orderBy, onRequestSort, onCreate } = props;
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleCreateDialogOpen = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setOpenCreateDialog(false);
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const checkOrder = (property) => {
    if (!orderBy || !orderBy[property]) return null;

    return orderBy[property] === "desc" ? "desc" : "asc";
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label, isSorted, align }) => {
          const orderInfo = checkOrder(id);
          const isOrder = !!orderInfo;

          return (
            <HeaderTableCell
              key={id}
              sortDirection={isOrder ? orderInfo : false}
            >
              {isSorted ? (
                <TableSortLabel
                  active={isOrder}
                  direction={isOrder ? orderInfo : "asc"}
                  onClick={createSortHandler(id)}
                >
                  {label}
                </TableSortLabel>
              ) : (
                <>{label}</>
              )}
            </HeaderTableCell>
          );
        })}
        <HeaderTableCell width={150} align="center">
          <Tooltip title="Add movie" arrow placement="top">
            <AddButtonIcon
              size="small"
              onClick={() => handleCreateDialogOpen()}
            >
              <AddIcon />
            </AddButtonIcon>
          </Tooltip>
          <MovieDialogEdit
            onSubmit={onCreate}
            open={openCreateDialog}
            onClose={handleCreateDialogClose}
          />
        </HeaderTableCell>
      </TableRow>
    </TableHead>
  );
};

const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <PaginationActionContainer>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </PaginationActionContainer>
  );
};

const MovieTableRow = ({ data, onCreate, onEdit, onDelete }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { title, produced_by, genre, release_date, created_by } = data;

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <SelectedTableRow>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        <TableCell>{produced_by}</TableCell>
        <TableCell>{genre.toString()}</TableCell>
        <TableCell>{release_date}</TableCell>
        <TableCell>{created_by}</TableCell>
        <TableCell align="center">
          <Tooltip title={`Edit movie ${title}`} arrow placement="top">
            <IconButton
              style={{ color: "#f39c12" }}
              size="small"
              onClick={() => setOpenEditDialog(!openEditDialog)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`Delete movie ${title}`} arrow placement="top">
            <IconButton
              style={{ color: "red" }}
              size="small"
              onClick={() => setOpenDeleteDialog(!openDeleteDialog)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </SelectedTableRow>
      {openEditDialog && (
        <MovieDialogEdit
          onSubmit={onEdit}
          open={openEditDialog}
          onClose={handleEditDialogClose}
          data={data}
        />
      )}
      {openDeleteDialog && (
        <MovieDialogDelete
          onDelete={onDelete}
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          data={data}
        />
      )}
    </>
  );
};

const MovieTable = ({
  data,
  dataCount,
  onFilter,
  onPagination,
  onCreate,
  onEdit,
  onDelete,
  pagination,
}) => {
  const [orderBy, setOrderBy] = useState();

  useEffect(() => {
    if (orderBy) {
      const orderFilter = Object.entries(orderBy).map(
        ([key, value]) => `${value === "asc" ? "+" : "-"}${key}`
      );

      onFilter(orderFilter.toString());
    }
  }, [orderBy, onFilter]);

  const handleRequestSort = (event, property) => {
    if (orderBy && orderBy[property]) {
      const order = orderBy[property] === "desc" ? "asc" : "desc";
      setOrderBy((prevState) => ({ ...prevState, [property]: order }));
    } else {
      setOrderBy((prevState) => ({ ...prevState, [property]: "asc" }));
    }
  };

  const handleChangePage = (event, newPage) => {
    onPagination({ page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    onPagination({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
  };

  const emptyRows = pagination.limit - data.length;

  return (
    <ComponentContainer>
      <Paper>
        <TableContainer>
          <Table size="medium" stickyHeader>
            <MovieTableHead
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onCreate={onCreate}
            />
            <TableBody>
              {data.map((item, index) => (
                <MovieTableRow
                  key={index}
                  data={item}
                  onCreate={onCreate}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 63 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  labelDisplayedRows={() => ""}
                  count={dataCount}
                  rowsPerPage={pagination.limit}
                  page={pagination.page - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </ComponentContainer>
  );
};

export default MovieTable;
