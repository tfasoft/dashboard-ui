import {
  Table,
  TableContainer,
  Paper,
  Box,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from "@mui/material";

import { Delete } from "@mui/icons-material";

import { tables } from "@/config";

import { useEffect, useState } from "react";

const TableComponent = ({ table, data, del, upd }) => {
  const tbl = tables[table];

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(10);

  const [renderRows, setRenderRows] = useState([]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (del) {
      data.map(
        (d, index) =>
          (d["delete"] = (
            <IconButton onClick={() => del(d._id)}>
              <Delete color="error" />
            </IconButton>
          ))
      );
    }

    setRenderRows(data.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  }, [data, page, rowsPerPage]);

  const renderSwitch = (d, i) => {
    switch (table) {
      default:
        return d[i];
    }
  };

  const onclickSwitch = (data) => {
    switch (table) {
      default:
        return null;
    }
  };

  return data.length > 0 ? (
    <Box>
      <Typography fontWeight={600} color="primary" fontSize={40} gutterBottom>
        {tbl.title}
      </Typography>
      <TableContainer
        variant="outlined"
        sx={{ borderColor: "primary.main", w: "100%" }}
        component={Paper}
      >
        <Table id={table}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              {Object.values(tbl.fields).map((item) => (
                <TableCell sx={{ color: "white" }} key={item} head>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderRows.map((d) => (
              <TableRow
                key={d}
                sx={{
                  "&:hover": { cursor: "pointer", background: "#fafafa" },
                }}
              >
                {Object.keys(tbl.fields).map((item) => (
                  <TableCell key={item}>{renderSwitch(d, item)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 3,
            px: 3,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="تعداد ردیف ها"
            label="تعداد ردیف ها"
            value={String(rowsPerPage)}
            onChange={(e) => setRowPerPage(Number(e.target.value))}
          />
          <Pagination
            sx={{ direction: "ltr" }}
            count={Math.ceil(data.length / rowsPerPage)}
            size="large"
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        </Box> */}
      </TableContainer>
    </Box>
  ) : (
    <Box>
      <Typography>No data is found.</Typography>
    </Box>
  );
};

export default TableComponent;
