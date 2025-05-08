import ModuleItem from "@/components/role-setup/role-setup-form/ModuleItem";
import { FiBox } from "react-icons/fi";

const ModuleSetting = ({ screen, roleId }) => {
  return (
    <div className="flex md:min-w-[22rem]">
      {!screen ? (
        <div className="flex flex-col gap-2 h-full w-full items-center justify-center">
          <FiBox size={40} className="text-gray-400" />
          <p className="text-center text-xs w-full tracking-wider">Please select the screen</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4 w-full  ">
          {screen.modules.map((item) => (
            <ModuleItem key={item.id} module={item} roleId={roleId} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModuleSetting;
