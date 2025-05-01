import React, { useState } from "react";

import { useAssignRoleMutation } from "../../hooks/query/user/useAssignRoleMutation";
import { useGetAll } from "../../hooks/query/common/useGetAll";
import CustomSelect from "../common/CustomSelect";
import Input from "../common/Input";
import { useValidateForm } from "../../validations/hooks/useValidateForm";
import { columnHelper } from "../../util/tableHelper";
import ButtonSecondary from "../common/ButtonSecondary";
import ButtonPrimary from "../common/ButtonPrimary";
import Toast from "../common/Toast";
import DeleteButton from "../common/DeleteButton";
import { assignRoleValidationSchema } from "../../validations/schema/assignRoleValidationSchema";
import { DataTable } from "../table/DataTable";

const initialFormData = {
  roleId: "",
  effectiveFrom: "",
  effectiveTo: "",
};

const AssignRoleForm = ({ userId, closeAssignRoleModal }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { data: unassignedRoles } = useGetAll(
    ["user_role/roles", userId, "unasigned"],
    {
      assigned: false,
      id: userId,
    },
    !!userId
  );
  const { data: assignedRoles } =
    useGetAll(
      ["user_role/roles", userId, "asigned"],
      {
        assigned: true,
        id: userId,
      },
      !!userId
    );

  const assignRoleMutation = useAssignRoleMutation(userId, {
    onSuccess: () => {},
  });

  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    assignRoleValidationSchema
  );
  console.log("Errors: ", errors);

  const options =
    unassignedRoles?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const columns = [
    columnHelper.display({
      header: "S.N",
      cell: ({ row: { index } }) => {
        return index + 1;
      },
    }),
    columnHelper.accessor("name", {
      header: "Role Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("effectiveFrom", {
      header: "Effective From",
    }),
    columnHelper.accessor("Effective To", {
      header: "Effective To",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row: { orginal } }) => <DeleteButton />,
    }),
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prevState) => {
        const newErrors = { ...prevState };
        delete newErrors[name];
        return newErrors;
      });
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleUserSelect(roleId) {
    if (errors["roleId"]) {
      setErrors((prevState) => {
        const newErrors = { ...prevState };
        delete newErrors["roleId"];
        return newErrors;
      });
    }
    setFormData((prevState) => ({
      ...prevState,
      roleId,
    }));
  }

  async function handleSubmit() {
    const isValid = await validateForm();
    if (isValid) {
      const data = { ...formData, userId };
      assignRoleMutation.mutate(data);
    }
  }

  return (
    <>
      <Toast />
      <div className="flex flex-col gap-5">
        <form className="flex flex-col md:flex-row gap-4">
          <CustomSelect
            id="roleId"
            label="Role"
            options={options}
            value={formData.roleId}
            onChange={handleUserSelect}
            placeholder="select user"
            searchable
            name="roleId"
            width={200}
            error={errors["roleId"]}
          />
          <Input
            id="effectiveFrom"
            label="Effective From"
            type="date"
            value={formData.effectiveFrom}
            onChange={handleChange}
            name="effectiveFrom"
            width={200}
            error={errors["effectiveFrom"]}
          />
          <Input
            id="effectiveTo"
            label="Effective To"
            type="date"
            value={formData.effectiveTo}
            onChange={handleChange}
            name="effectiveTo"
            width={200}
            error={errors["effectiveTo"]}
          />
        </form>
        <DataTable
          data={assignedRoles || []}
          columns={columns}
          isServerSide={false}
          enableFuzzyFilter={false}
          enableVirtualization={true}
        />
        <div className="flex gap-8 justify-end">
          <ButtonSecondary type="button" onClick={closeAssignRoleModal}>
            Close
          </ButtonSecondary>
          <ButtonPrimary type="button" onClick={handleSubmit}>
            Assign
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default AssignRoleForm;
