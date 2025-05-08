import ModuleSetting from "@/components/role-setup/role-setup-form/ModuleSetting";
import Sidebar from "@/components/role-setup/role-setup-form/Sidebar";
import { useGetRoleById } from "@/hooks/query/role/userGetRoleById";
import React, { useState } from "react";

const RoleSetupForm = ({ roleId }) => {
  const [activeScreenId, setActiveScreenId] = useState(null);
  const { data } = useGetRoleById(roleId);
  let activeScreen;
  if (activeScreenId && data) {
    activeScreen = data.find((item) => item.id === activeScreenId);
  }
  return (
    <div className="flex gap-2">
      <Sidebar
        data={data || []}
        activeScreenId={activeScreenId}
        setActiveScreenId={setActiveScreenId}
        roleId={roleId}
      />
      <ModuleSetting
        key={roleId}
        screen={activeScreen}
        roleId={roleId}
        setActiveScreenId={setActiveScreenId}
      />
    </div>
  );
};

export default RoleSetupForm;
