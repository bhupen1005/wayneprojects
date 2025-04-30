import React from "react";
import Paragraph from "./Paragraph";
import Button from "./Button";

const Body = () => (
  <main>
    <Paragraph text="This is the first paragraph." />
    <Paragraph text="Here's another informative paragraph." />
    <Button label="Click Me" />
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1, Cell 1</td>
          <td>Row 1, Cell 2</td>
        </tr>
        <tr>
          <td>Row 2, Cell 1</td>
          <td>Row 2, Cell 2</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Footer 1</td>
          <td>Footer 2</td>
        </tr>
      </tfoot>
    </table>
  </main>
);
export default Body;
