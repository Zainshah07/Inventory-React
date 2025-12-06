import React from "react";
import DataTable from "react-data-table-component";

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
