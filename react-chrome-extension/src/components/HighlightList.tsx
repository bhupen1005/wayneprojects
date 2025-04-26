import React from 'react';

interface Props {
  highlights: string[];
}

const HighlightList: React.FC<Props> = ({ highlights }) => (
  <ul>
    {highlights.map((text, idx) => (
      <li key={idx}>{text}</li>
    ))}
  </ul>
);

export default HighlightList;
