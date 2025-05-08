import CustomSelect from "@/components/common/CustomSelect";
import DeleteButton from "@/components/common/DeleteButton";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import { METHODS } from "@/data/methods";
import { useGetPrivilege } from "@/hooks/query/module/useGetPrivilege";


const AddPrivilege = ({ privileges, setPrivileges, errors, setErrors }) => {
  const { data } = useGetPrivilege();

  const privilegeOptions =
    data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const methodsOptions = METHODS.map((item) => ({
    value: item,
    label: item,
  }));

  const getError = (privilegeIndex, fieldPath) => {
    const privilegeErrors = errors?.[`[${privilegeIndex}]`];
    if (!privilegeErrors) return null;

    if (fieldPath.startsWith("endPoints[0].")) {
      const endpointErrors = privilegeErrors["endPoints[0]"];
      const field = fieldPath.replace("endPoints[0].", "");
      return endpointErrors?.[field];
    }

    return privilegeErrors[fieldPath];
  };

  const clearError = (privilegeIndex, fieldPath) => {
    if (!errors || !errors[`[${privilegeIndex}]`]) return;
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      const privilegeKey = `[${privilegeIndex}]`;

      if (fieldPath.startsWith("endPoints[0].")) {
        const field = fieldPath.replace("endPoints[0].", "");
        if (newErrors[privilegeKey]?.["endPoints[0]"]?.[field]) {
          newErrors[privilegeKey]["endPoints[0]"] = {
            ...newErrors[privilegeKey]["endPoints[0]"],
            [field]: undefined,
          };

          // Clean up empty endpoint error objects
          if (
            Object.keys(newErrors[privilegeKey]["endPoints[0]"]).every(
              (k) => !newErrors[privilegeKey]["endPoints[0]"][k]
            )
          ) {
            delete newErrors[privilegeKey]["endPoints[0]"];
          }
        }
      } else if (newErrors[privilegeKey]?.[fieldPath]) {
        newErrors[privilegeKey] = {
          ...newErrors[privilegeKey],
          [fieldPath]: undefined,
        };
      }

      // Clean up empty privilege error objects
      if (
        Object.keys(newErrors[privilegeKey]).every(
          (k) => !newErrors[privilegeKey][k]
        )
      ) {
        delete newErrors[privilegeKey];
      }

      return Object.keys(newErrors).length ? newErrors : {};
    });
  };

  const handleAddPrivilege = () => {
    setPrivileges([
      ...privileges,
      {
        privilegeId: null,
        endPoints: [{ url: "", method: null }],
      },
    ]);
  };

  const handleRemovePrivilege = (index) => {
    if (privileges.length <= 1) return;
    const updatedPrivileges = [...privileges];
    updatedPrivileges.splice(index, 1);
    setPrivileges(updatedPrivileges);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`[${index}]`];
      return Object.keys(newErrors).length ? newErrors : {};
    });
  };

  const handlePrivilegeChange = (index, privilegeId) => {
    clearError(index, "privilegeId");
    const updatedPrivileges = [...privileges];
    updatedPrivileges[index] = {
      ...updatedPrivileges[index],
      privilegeId,
    };
    setPrivileges(updatedPrivileges);
  };

  const handleMethodChange = (index, method) => {
    clearError(index, "endPoints[0].method");
    const updatedPrivileges = [...privileges];
    updatedPrivileges[index] = {
      ...updatedPrivileges[index],
      endPoints: [
        {
          ...updatedPrivileges[index].endPoints[0],
          method,
        },
      ],
    };
    setPrivileges(updatedPrivileges);
  };

  const handleUrlChange = (index, url) => {
    clearError(index, "endPoints[0].url");
    const updatedPrivileges = [...privileges];
    updatedPrivileges[index] = {
      ...updatedPrivileges[index],
      endPoints: [
        {
          ...updatedPrivileges[index].endPoints[0],
          url,
        },
      ],
    };
    setPrivileges(updatedPrivileges);
  };

  return (
    <div className="">
      <Label title="Privileges" />

      {privileges.map((privilege, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-2 ">
          <div className="flex-1 md:flex-none">
            <CustomSelect
              id="privilege"
              options={privilegeOptions}
              value={privilege.privilegeId}
              onChange={(value) => handlePrivilegeChange(index, value)}
              placeholder="Privilege"
              className="w-full md:w-[10rem]"
              error={getError(index, "privilegeId")}
            />
          </div>

          <div className="flex-1 md:flex-none">
            <CustomSelect
              id="method"
              options={methodsOptions}
              value={privilege.endPoints[0]?.method}
              onChange={(value) => handleMethodChange(index, value)}
              placeholder="Method"
              className="w-full md:w-[10rem]"
              error={getError(index, "endPoints[0].method")}
            />
          </div>

          <div className="flex-1 w-full">
            <Input
              id="endpoint"
              type="text"
              value={privilege.endPoints[0]?.url || ""}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              name={`endpoint-${index}`}
              placeholder="Endpoint URL"
              error={getError(index, "endPoints[0].url")}
            />
          </div>

          {privileges.length > 1 && (
            <DeleteButton onClick={() => handleRemovePrivilege(index)} />
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleAddPrivilege}
          className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
        >
          Add more privilege
        </button>
      </div>
    </div>
  );
};

export default AddPrivilege;
