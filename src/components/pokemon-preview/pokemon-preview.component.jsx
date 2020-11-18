import PropTypes from "prop-types";
import React, { useState, useEffect, memo } from "react";
import { useObserver } from "mobx-react";
import CardPreview from "../card-preview/card-preview.component";
import PaginationActions from "./pagination-action.component";
import { paginationStyles } from "./MUI-styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Grid,
} from "@material-ui/core";

const Preview = ({
  data,
  rows,
  isType,
  page,
  totalPokemonsCount,
  setResultPerPage,
  setOffset,
  setPage,
}) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [rowsPerPage, setRowsPerPage] = useState(rows);
  const classes = paginationStyles();

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    setCurrentPage(newPage);
    setPage(newPage);
    if (!isType && newPage > currentPage) {
      setOffset(data.length);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const intValue = parseInt(event.target.value, 10);
    setRowsPerPage(intValue);
    if (!isType) {
      setOffset(data.length);
      setResultPerPage(intValue);
    }
  };

  return useObserver(() => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell>
                <Grid container spaicing={4} alignContent="center">
                  {(rowsPerPage > 0
                    ? data.slice(
                        currentPage * rowsPerPage,
                        currentPage * rowsPerPage + rowsPerPage
                      )
                    : data
                  ).map((pokemon, index) => {
                    return (
                      <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
                        <CardPreview pokemon={pokemon} additionalInfo={false} />
                      </Grid>
                    );
                  })}
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                classes={{
                  toolbar: classes.tablePagination,
                  caption: classes.caption,
                }}
                rowsPerPageOptions={[10, 20, 50]}
                colSpan={3}
                count={totalPokemonsCount}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={"Cards per page"}
                page={currentPage}
                SelectProps={{
                  inputProps: { "aria-label": "Cards" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={PaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  });
};

Preview.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  setResultPerPage: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired,
  totalPokemonsCount: PropTypes.number.isRequired,
  isType: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

export const PokemonPreview = memo(Preview);
