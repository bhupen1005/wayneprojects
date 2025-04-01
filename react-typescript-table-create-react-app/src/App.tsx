import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MyTable from "./MyTable";
import MyTable3 from "./MyTable3";
import MyTable4 from "./HeaderGroup";
import ColumnFilters from "./ColumnFilters";
import ColumnFiltersFaceted from "./ColumnFiltersFaceted";
import ColumnOrdering from "./ColumnOrdering";
import EditableData from "./EditableData";
// import ColumnFiltersDrag from "./ColumnFiltersDrag";

function App() {
  return (
    <div className="App">
      <MyTable />
      <MyTable3 />
      <hr />
      <MyTable4 />
      <hr />
      <ColumnFilters />
      <hr />
      <ColumnFiltersFaceted />
      <hr />
      <ColumnOrdering />
      <hr />
      <EditableData />
      <hr />
      {
        // functionality of below component is pending.
      }
      {/* <ColumnFiltersDrag /> */}
    </div>
  );
}

export default App;
