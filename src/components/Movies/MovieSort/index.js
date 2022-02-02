import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  TableSortLabel as MuiTableSortLabel,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import styled from "styled-components/macro";

const FilterIcon = styled(FilterListIcon)`
  margin-right: 6px;
  font-size: 20px;
`;
const FilterTable = styled(Table)`
  width: auto;
`;

const TableCell = styled(MuiTableCell)`
  border-bottom: none;
  padding: 0;
  font-size: 1rem;
`;

const TableSortLabel = styled(MuiTableSortLabel)`
  background-color: ${(props) => props.theme.palette.primary.main};
  color: white;
  padding: ${(props) => props.theme.spacing(1)}px
    ${(props) => props.theme.spacing(2)}px;
  margin-left: ${(props) => props.theme.spacing(4)}px;
  border-radius: 0.3rem;
  outline: none;
  color: white;
  font-weight: 400;
  line-height: 1.5rem;
  cursor: pointer;
  transition: all 150ms ease-out;

  :focus,
  :hover {
    color: white;
    background-color: ${(props) => props.theme.palette.primary.main};
    box-shadow: 0 0 0 0.1875rem white,
      0 0 0 0.375rem ${(props) => props.theme.palette.primary.main};
  }

  :active {
    background-color: ${(props) => props.theme.palette.primary.main};
    box-shadow: 0 0 0 0.1875rem ${(props) => props.theme.palette.primary.main},
      0 0 0 0.375rem ${(props) => props.theme.palette.primary.main};
    transition-duration: 75ms;
  }

  &.MuiTableSortLabel-active {
    color: white;
  }

  .MuiTableSortLabel-icon {
    color: rgba(255, 255, 255, 0.7) !important;
  }
`;

const MovieSort = ({ onFilter }) => {
  const [sortByDate, setSortByDate] = useState(null);
  const [sortByScore, setsortByScore] = useState(null);

  const handleSortDate = () => {
    const sort = sortByDate === "asc" ? "desc" : "asc";
    setSortByDate(sort);
    setsortByScore(null);
    onFilter(sort === "asc" ? "release_date" : "-release_date");
  };

  const handleSortScore = () => {
    const sort = sortByScore === "asc" ? "desc" : "asc";
    setSortByDate(null);
    setsortByScore(sort);
    onFilter(sort === "asc" ? "score_filter" : "-score_filter");
  };

  return (
    <FilterTable aria-labelledby="movie sort">
      <TableHead>
        <TableRow>
          <TableCell>Sort by:</TableCell>
          <TableCell sortDirection={!!sortByDate ? sortByDate : false}>
            <TableSortLabel
              active={!!sortByDate}
              direction={!!sortByDate ? sortByDate : "asc"}
              onClick={handleSortDate}
            >
              <FilterIcon />
              Release date
            </TableSortLabel>
          </TableCell>
          <TableCell sortDirection={!!sortByScore ? sortByScore : false}>
            <TableSortLabel
              active={!!sortByScore}
              direction={!!sortByScore ? sortByScore : "asc"}
              onClick={handleSortScore}
            >
              <FilterIcon />
              Average score
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    </FilterTable>
  );
};

export default MovieSort;
