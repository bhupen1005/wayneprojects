import React from 'react';
import SidebarSection from './SidebarSection';

const Sidebar = () => (
  <aside>
    <SidebarSection title="Features">
      <SidebarSection.Link label="Feature A" />
      <SidebarSection.Link label="Feature B" />
    </SidebarSection>
    <SidebarSection title="Resources">
      <SidebarSection.Link label="Docs" />
      <SidebarSection.Link label="Tutorials" />
    </SidebarSection>
  </aside>
);

export default Sidebar;
