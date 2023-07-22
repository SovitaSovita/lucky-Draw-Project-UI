import React from "react";
import Navbar from "../component/Navbar";
import TableList from "../component/TableList";
import RemoveCustomer from "../component/RemoveCustomer";

export default function ManageListPage() {
  return (
    <>
      <div className="p-6 pl-3 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 min-h-screen border-dashed rounded-lg">
          <Navbar />

          <TableList />
        </div>
      </div>
    </>
  );
}
