import React from "react";
import DataTable from "react-data-table-component";

// contains th data-table component. receive column and data props and insert them in the table. handles pagination, responsiveness, and sorting of the data.
function Table({ columns, data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      responsive
    ></DataTable>
  );
}

export default Table;
