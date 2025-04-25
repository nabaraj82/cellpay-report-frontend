import React, { useMemo } from 'react'
import NavItem from './NavItem';
import { NAV_ITEMS } from '../../data/navigations';
import { filterPermissions } from '../../util/filterPermissions';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const permissions = useSelector((state) => state.user.currentUser?.permissions);
  const filteredRoutes = useMemo(() => filterPermissions(permissions, NAV_ITEMS), [permissions]);

  return (
    <nav className="flex-1 p-4 overflow-y-auto">
      {filteredRoutes.map((item) => (
        <NavItem
          key={item.text}
          icon={<item.Icon size={item.size} />}
          text={item.text}
          path={item.path}
          subItems={item.children}
        />
      ))}
    </nav>
  );
}

export default Navigation;
