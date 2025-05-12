import React, { useCallback, useMemo, useRef, useState } from "react";
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
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import ButtonDanger from "@/components/common/ButtonDanger";
import { useRemoveUserRoleMutation } from "@/hooks/query/role/useRemoveUserRoleMutation";
import CustomDatePicker from "@/components/common/DatePicker";

const initialFormData = {
  roleId: "",
  effectiveFrom: "",
  effectiveTo: "",
};

const AssignRoleForm = ({ userId, closeAssignRoleModal }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const roleDeleteRef = useRef(null);

  // Memoize today's date to prevent recalculation on every render
  const today = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("en-CA"); // 'en-CA' gives YYYY-MM-DD format
  }, []);

  // Data fetching
  const queryParams = useMemo(() => ({ id: userId }), [userId]);

  const { data: unassignedRoles = [] } = useGetAll(
    ["user_role/roles", userId, "unassigned"],
    { ...queryParams, assigned: false },
    !!userId
  );

  const { data: assignedRoles = [] } = useGetAll(
    ["user_role/roles", userId, "assigned"],
    { ...queryParams, assigned: true },
    !!userId
  );

  // Mutations
  const assignRoleMutation = useAssignRoleMutation(userId);
  const removeUserRoleMutation = useRemoveUserRoleMutation({
    queryKey: ["user_role/roles", userId],
    onSuccess: () => {
      roleDeleteRef.current = null;
      setIsDeleteModalOpen(false);
    },
  });

  // Form validation
  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    assignRoleValidationSchema
  );

  // Memoized derived values
  const options = useMemo(
    () => unassignedRoles.map(({ id, name }) => ({ value: id, label: name })),
    [unassignedRoles]
  );

  const columns = useMemo(
    () => [
      columnHelper.display({
        header: "S.N",
        cell: ({ row: { index } }) => index + 1,
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
      columnHelper.accessor("effectiveTo", {
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
    ],
    []
  );

  // Event handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevState) => {
      const newErrors = { ...prevState };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const handleUserSelect = useCallback((roleId) => {
    setFormData((prevState) => ({
      ...prevState,
      roleId,
    }));

    setErrors((prevState) => {
      const newErrors = { ...prevState };
      delete newErrors.roleId;
      return newErrors;
    });
  }, []);

  const handleOpenDeleteConfirmModal = useCallback(
    (roleId) => {
      roleDeleteRef.current = { userId, roleId };
      setIsDeleteModalOpen(true);
    },
    [userId]
  );

  const handleDeleteConfirm = useCallback((e) => {
    e.stopPropagation();
    if (roleDeleteRef.current) {
      removeUserRoleMutation.mutate(roleDeleteRef.current);
    }
  }, []);

  const handleReset = useCallback(() => {
    roleDeleteRef.current = null;
    setFormData(initialFormData);
    setErrors({});
  }, []);

  const handleSubmit = useCallback(async () => {
    const isValid = await validateForm();
    if (isValid) {
      assignRoleMutation.mutate({ ...formData, userId });
    }
  }, [formData, userId, validateForm]);

  // Modal actions
  const closeModal = useCallback(() => setIsDeleteModalOpen(false), []);

  return (
    <>
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={closeModal}>
        <div className="flex gap-2 justify-end md:min-w-[20rem] mt-4">
          <ButtonSecondary type="button" onClick={closeModal}>
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
            error={errors.roleId}
          />
          <CustomDatePicker
            id="effectiveFrom"
            label="Effective From"
            type="date"
            name="effectiveFrom"
            value={formData.effectiveFrom}
            onChange={handleChange}
            error={errors.effectiveFrom}
            min={today}
            useDatePicker
          />
          <CustomDatePicker
            id="effectiveTo"
            label="Effective To"
            type="date"
            name="effectiveTo"
            value={formData.effectiveTo}
            onChange={handleChange}
            error={errors.effectiveTo}
            min={today}
            useDatePicker
          />
        </form>

        <DataTable
          data={assignedRoles}
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
          <ButtonPrimary type="button" disabled={assignRoleMutation.isPending} onClick={handleSubmit}>
            Assign
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default React.memo(AssignRoleForm);
