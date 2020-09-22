import React, { useState } from "react";
// import { usePokemonStore } from "../../hooks/hooks";
import { useObserver } from "mobx-react";
import CardPreview from "../card-preview/card-preview.component";

import PaginationActions from "./pagination-action.component";

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

const PokemonPreview = ({ data }) => {
  //   const pokemonStore = usePokemonStore();

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return useObserver(() => (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableBody>
          <TableRow>
            <TableCell>
              <Grid container spaicing={3}>
                {(rowsPerPage > 0
                  ? data.slice(
                      currentPage * rowsPerPage,
                      currentPage * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((pokemon, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={2}>
                      <CardPreview pokemon={pokemon} />
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
              rowsPerPageOptions={[10, 20, 50]}
              colSpan={3}
              count={data.length}
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
  ));
};

export default PokemonPreview;
