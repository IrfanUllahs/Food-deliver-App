import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function CustomPagination({ handlePageChange, currPage, totalPages }) {
  const handleChange = (event, value) => {
    handlePageChange(value);
  };

  return (
    <Stack spacing={2} alignItems="center" my={4}>
      <Pagination
        count={totalPages}
        page={currPage}
        onChange={handleChange}
        variant="outlined"
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        color="primary"
        siblingCount={0}
        boundaryCount={1}
      />
    </Stack>
  );
}

export default CustomPagination;
