import React, { useMemo } from "react";
import CheckboxGroup from "@/components/common/CheckboxGroup";
import Switch from "@/components/common/Switch";
import usePermissionUpdateMutation from "@/hooks/query/role/usePermissionUpdateMutation";
import { useRAPMutation } from "@/hooks/query/role/useRAPMutation";

const ModuleItem = ({ module, roleId }) => {
  const permissionMutation = usePermissionUpdateMutation(
    ["role", roleId],
    "/permission"
  );
  const rapMutation = useRAPMutation(["role", roleId]);

  const isSwitchEnabled = useMemo(
    () => module.privilege.every((item) => item.isSelected),
    [module.privilege]
  );

  const handlePrivilegeChange = (privilege) => {
    const action = privilege.isSelected ? "REMOVE" : "ADD";
    const body = {
      roleId,
      action,
      modules: [
        {
          id: module.id,
          privilege: [privilege.id],
        },
      ],
    };

    permissionMutation.mutate(body);
  };

  const handleToggleSwitch = () => {
    if (isSwitchEnabled) {
      rapMutation.mutate({ roleId, moduleId: module.id });
    } else {
      const body = {
        roleId,
        action: "ADD",
        modules: module.privilege.map((item) => ({
          id: module.id,
          privilege: [item.id],
        })),
      };
      permissionMutation.mutate(body);
    }
  };

  return (
    <li className="flex flex-col gap-2 border border-gray-400 rounded-md px-2 py-2">
      <div className="flex justify-between items-center">
        <h2>{module.name}</h2>
        <Switch
          enabled={isSwitchEnabled}
          onChange={handleToggleSwitch}
          id={module.id}
        />
      </div>
      <CheckboxGroup
        options={module.privilege}
        onChange={handlePrivilegeChange}
      />
    </li>
  );
};

export default ModuleItem;
