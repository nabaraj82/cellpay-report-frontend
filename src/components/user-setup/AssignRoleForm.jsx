import React, { useRef, useState } from "react";
import { useGetAll } from "@/hooks/query/common/useGetAll";
import { useAssignRoleMutation } from "@/hooks/query/user/useAssignRoleMutation";
import { useValidateForm } from "@/validations/hooks/useValidateForm";
import { assignRoleValidationSchema } from "@/validations/schema/assignRoleValidationSchema";
import DeleteButton from "@/components/common/DeleteButton";
import CustomSelect from "@/components/common/CustomSelect";
import Input from "@/components/common/Input";
import { DataTable } from "@/components/table/DataTable";
import ButtonSecondary from "@/components/common/ButtonSecondary";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { columnHelper } from "@/util/tableHelper";
import { useShowModal } from "@/hooks/useShowModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import ButtonDanger from "@/components/common/ButtonDanger";
import { useRemoveUserRoleMutation } from "@/hooks/query/role/useRemoveUserRoleMutation";

const initialFormData = {
  roleId: "",
  effectiveFrom: "",
  effectiveTo: "",
};

const AssignRoleForm = ({ userId, closeAssignRoleModal }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const roleDeleteRef = useRef(null);
  const { data: unassignedRoles } = useGetAll(
    ["user_role/roles", userId, "unasigned"],
    {
      assigned: false,
      id: userId,
    },
    !!userId
  );
  const { data: assignedRoles } = useGetAll(
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
  const removeUserRoleMutation = useRemoveUserRoleMutation({
    queryKey: ["user_role/roles", userId],
    onSuccess: () => {
      roleDeleteRef.current = null;
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      userDeleteRef.current = null;
      setIsDeleteModalOpen(false);
    },
  });

  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    assignRoleValidationSchema
  );

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
      cell: ({ row: { original } }) => (
        <DeleteButton
          onClick={() => handleOpenDeleteConfirmModal(original.id)}
        />
      ),
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

  function handleOpenDeleteConfirmModal(roleId) {
    roleDeleteRef.current = {
      userId,
      roleId,
    };
    setIsDeleteModalOpen(true);
  }
  function handleDeleteConfirm(e) {
    e.stopPropagation();
    removeUserRoleMutation.mutate(roleDeleteRef.current);
    setIsDeleteModalOpen(false);
  }

  function handleReset() {
    roleDeleteRef.current = null;
    setFormData(initialFormData);
    setErrors({});
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
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="flex gap-2 justify-end md:min-w-[20rem] mt-4">
          <ButtonSecondary
            type="button"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            No
          </ButtonSecondary>
          <ButtonDanger type="button" onClick={handleDeleteConfirm}>
            Yes
          </ButtonDanger>
        </div>
      </DeleteConfirmationModal>
      <div className="flex flex-col gap-5">
        <form className="flex flex-col md:flex-row gap-4">
          <CustomSelect
            id="roleId"
            label="Role"
            options={options}
            value={formData.roleId}
            onChange={handleUserSelect}
            placeholder="select role"
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
            min={new Date().toISOString().split("T")[0]}
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
            min={new Date().toISOString().split("T")[0]}
          />
        </form>
        <DataTable
          data={assignedRoles || []}
          columns={columns}
          isServerSide={false}
          enableFuzzyFilter={false}
          enableVirtualization={true}
          tableHeight="sm"
        />
        <div className="flex gap-4 justify-end">
          <ButtonSecondary type="button" onClick={closeAssignRoleModal}>
            Close
          </ButtonSecondary>
          <ButtonDanger onClick={handleReset}>Reset</ButtonDanger>
          <ButtonPrimary type="button" onClick={handleSubmit}>
            Assign
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default AssignRoleForm;
