import React from 'react';

const SidebarSection = ({ title, children }) => (
  <div className="sidebar-section">
    <h2>{title}</h2>
    <ul>
      {children}
    </ul>
  </div>
);

const SidebarLink = ({ label }) => <li><a href="#">{label}</a></li>;

SidebarSection.Link = SidebarLink;

export default SidebarSection;
