import CheckboxGroup from "@/components/common/CheckboxGroup";
import Switch from "@/components/common/Switch";
import usePermissionUpdateMutation from "@/hooks/query/role/usePermissionUpdateMutation";
import { useRAPMutation } from "@/hooks/query/role/useRAPMutation";


const ModuleItem = ({ module, roleId }) => {
    const permissionMutation = usePermissionUpdateMutation(['role', roleId], '/permission');
    const rapMutation = useRAPMutation(["role", roleId]);
     
    const isSwitchEnabled = module.privilege.every((item) => item.isSelected)


    function handlePrivilageChange(privilege) {
        let action = privilege.isSelected ? "REMOVE" : "ADD";
        const body = {
            modules: [
                {
                    id: module.id,
                    privilege: [
                        privilege.id
                    ]
                }
            ],
            roleId,
            action,
        }

        permissionMutation.mutate(body)
    }
    function handleToggleSwitch() {
        if (isSwitchEnabled) {
            const body = {
                roleId,
                moduleId: module.id
            }
            rapMutation.mutate(body);
        } else {
            const body = {
                modules: module.privilege.map((item) => ({
                    id: module.id,
                    privilege: [item.id]
                })),
                roleId,
                action: "ADD"
            }
            permissionMutation.mutate(body)
        }
    }
  return (
    <>
      <li className="flex flex-col gap-2 border border-gray-400 rounded-md px-2 py-2">
        <div
          className="flex justify-between items-center"
        >
          <h2>{module.name}</h2>
          <Switch enabled={isSwitchEnabled} onChange={handleToggleSwitch} id={module.id} />
        </div>
        <div className="">
          <CheckboxGroup
            options={module.privilege}
            onChange={handlePrivilageChange}
          />
        </div>
      </li>
    </>
  );
};

export default ModuleItem;
