import React from 'react';

const Article = ({ title, children }) => (
  <article>
    <h2>{title}</h2>
    {children}
  </article>
);

export default Article;
