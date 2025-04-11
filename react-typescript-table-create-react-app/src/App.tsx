import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MyTable from "./MyTable";
import MyTable3 from "./MyTable3";
import MyTable4 from "./HeaderGroup";
import ColumnFilters from "./ColumnFilters";
import ColumnFiltersFaceted from "./ColumnFiltersFaceted";
import ColumnOrdering from "./ColumnOrdering";
import ColumnOrderingExpand from "./ColumnOrderingExpand";
import EditableData from "./EditableData";
import EditableDataPersist from "./EditableDataPersist";
import RowSelection from "./RowSelection";
import ExpandableEditableTable from "./ZBigZ";
import ZBigTable from "./ZBigTable";
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
      <hr />
      <h2>Not saved until saved..</h2>
      <EditableDataPersist />
      <hr />
      {
        // functionality of below component is pending.
      }
      {/* <ColumnFiltersDrag /> */}

      <RowSelection />
      <hr />
      <ColumnOrderingExpand />
      <hr />
      {/* <ExpandableEditableTable /> */}
      <ZBigTable />
    </div>
  );
}

export default App;
