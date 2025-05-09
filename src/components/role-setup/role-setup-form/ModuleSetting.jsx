import React, { useMemo } from "react";
import ModuleItem from "@/components/role-setup/role-setup-form/ModuleItem";
import { FiBox } from "react-icons/fi";

const ModuleSetting = ({ screen, roleId }) => {
  const modules = useMemo(() => screen?.modules || [], [screen]);

  if (!screen) {
    return (
      <div className="flex flex-col gap-2 h-full w-full items-center justify-center md:min-w-[22rem]">
        <FiBox size={40} className="text-gray-400" />
        <p className="text-center text-xs tracking-wider w-full">
          Please select the screen
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full md:min-w-[22rem]">
      <ul className="flex flex-col gap-4 w-full">
        {modules.map((module) => (
          <ModuleItem key={module.id} module={module} roleId={roleId} />
        ))}
      </ul>
    </div>
  );
};

export default ModuleSetting;
