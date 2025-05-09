import React, { useMemo, useState } from "react";
import Sidebar from "@/components/role-setup/role-setup-form/Sidebar";
import ModuleSetting from "@/components/role-setup/role-setup-form/ModuleSetting";
import { useGetRoleById } from "@/hooks/query/role/userGetRoleById";

const RoleSetupForm = ({ roleId }) => {
  const [activeScreenId, setActiveScreenId] = useState(null);
  const { data: roleData = [] } = useGetRoleById(roleId);

  const activeScreen = useMemo(() => {
    return roleData.find((item) => item.id === activeScreenId) || null;
  }, [activeScreenId, roleData]);

  return (
    <div className="flex gap-2">
      <Sidebar
        data={roleData}
        roleId={roleId}
        activeScreenId={activeScreenId}
        setActiveScreenId={setActiveScreenId}
      />
      <ModuleSetting screen={activeScreen} roleId={roleId} />
    </div>
  );
};

export default RoleSetupForm;
