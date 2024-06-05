import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { TransformToTableData } from "../hooks";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";

export const BasicTable = ({
  rows,
  handleDelete,
}: {
  rows: TransformToTableData[];
  handleDelete: (id: string) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Corretor</TableCell>
            <TableCell align="center">Data</TableCell>
            <TableCell align="center">Horário</TableCell>
            <TableCell align="center">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.corretor}</TableCell>
              <TableCell align="center">{row.data}</TableCell>
              <TableCell align="center">{row.hora}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(row.id)}
                >
                  <DeleteOutlineTwoToneIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
