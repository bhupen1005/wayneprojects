import React from 'react';
import Paragraph from './Paragraph';
import Button from './Button';

const Body = () => (
  <main>
    <Paragraph text="This is the first paragraph." />
    <Paragraph text="Here's another informative paragraph." />
    <Button label="Click Me" />
  </main>
);
export default Body;
