import React, { useCallback, useMemo, useRef, useState } from "react";
import ButtonDanger from "@/components/common/ButtonDanger";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import ButtonSecondary from "@/components/common/ButtonSecondary";
import CustomSelect from "@/components/common/CustomSelect";
import DeleteButton from "@/components/common/DeleteButton";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import EditButton from "@/components/common/EditButton";
import { DataTable } from "@/components/table/DataTable";
import { useGetAll } from "@/hooks/query/common/useGetAll";
import { useAssignRoleMutation } from "@/hooks/query/role/useAssignRoleMutation";
import { useRemoveUserRoleMutation } from "@/hooks/query/role/useRemoveUserRoleMutation";
import { useShowModal } from "@/hooks/useShowModal";
import { columnHelper } from "@/util/tableHelper";
import { useValidateForm } from "@/validations/hooks/useValidateForm";
import { assignUserValidationSchema } from "@/validations/schema/assignUserValidationSchema";
import CustomDatePicker from "@/components/common/DatePicker";

const initialFormData = {
  userId: "",
  effectiveFrom: "",
  effectiveTo: "",
};

const AssignUserForm = ({ roleId, closeAssignRoleModal }) => {
  const [formData, setFormData] = useState(initialFormData);
  const isEditingRef = useRef(false);
  const userDeleteRef = useRef(null);
  const {
    isOpen: isDeleteModalOpen,
    showModal: showDeleteModal,
    closeModal: closeDeleteModal,
  } = useShowModal();

  // Memoize today's date to prevent recalculation on every render
 const today = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("en-CA"); // 'en-CA' gives YYYY-MM-DD format
  }, []);


  // Data fetching with memoized query parameters
  const queryParams = useMemo(() => ({ id: roleId }), [roleId]);

  const { data: unassigned_users = [] } = useGetAll(
    ["user_role/users", roleId, "unassigned"],
    { ...queryParams, assigned: false },
    !!roleId
  );

  const { data: assigned_users = [] } = useGetAll(
    ["user_role/users", roleId, "assigned"],
    { ...queryParams, assigned: true },
    !!roleId
  );

  // Mutations
  const assignRoleMutation = useAssignRoleMutation(roleId, {
    onSuccess: () => {
      isEditingRef.current = false;
      handleReset();
    },
  });

  const removeUserRoleMutation = useRemoveUserRoleMutation({
    queryKey: ["user_role/user"],
    onSuccess: () => {
      userDeleteRef.current = null;
      closeDeleteModal();
    },
  });

  // Form validation
  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    assignUserValidationSchema
  );

  // Memoized options with editing support
  const options = useMemo(() => {
    const baseOptions = unassigned_users.map(({ id, name }) => ({
      value: id,
      label: name,
    }));

    if (isEditingRef.current) {
      const user = assigned_users.find((item) => item.id === formData.userId);
      if (user) {
        return [...baseOptions, { value: user.id, label: user.name }];
      }
    }
    return baseOptions;
  }, [unassigned_users, assigned_users, formData.userId]);

  // Memoized columns
  const columns = useMemo(
    () => [
      columnHelper.display({
        header: "S.N",
        cell: ({ row: { index } }) => index + 1,
      }),
      columnHelper.accessor("name", {
        header: "User Name",
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
          <div className="flex gap-4">
            <EditButton onClick={() => handleEdit(original)} />
            <DeleteButton
              onClick={() => handleOpenDeleteConfirmModal(original)}
            />
          </div>
        ),
      }),
    ],
    []
  );

  // Event handlers
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleEdit = useCallback((user) => {
    setErrors({});
    isEditingRef.current = true;
    setFormData({
      userId: user.id,
      effectiveFrom: user.effectiveFrom,
      effectiveTo: user.effectiveTo,
    });
  }, []);

  const handleUserSelect = useCallback(
    (userId) => {
      setFormData((prev) => ({ ...prev, userId }));

      if (errors.userId) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.userId;
          return newErrors;
        });
      }
    },
    [errors.userId]
  );

  const handleReset = useCallback(() => {
    isEditingRef.current = false;
    setFormData(initialFormData);
    setErrors({});
  }, []);

  const handleOpenDeleteConfirmModal = useCallback(
    (user) => {
      userDeleteRef.current = { userId: user.id, roleId };
      showDeleteModal();
    },
    [roleId]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (userDeleteRef.current) {
      removeUserRoleMutation.mutate(userDeleteRef.current);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const data = isEditingRef.current
      ? { ...formData, roleId, id: formData.userId }
      : { ...formData, roleId };

    assignRoleMutation.mutate(data);
  }, [formData, roleId, validateForm]);

  return (
    <>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      >
        <div className="flex gap-2 justify-end md:min-w-[20rem] mt-4">
          <ButtonSecondary type="button" onClick={closeDeleteModal}>
            No
          </ButtonSecondary>
          <ButtonDanger type="button" onClick={handleDeleteConfirm}>
            Yes
          </ButtonDanger>
        </div>
      </DeleteConfirmationModal>

      <div className="flex flex-col gap-5 relative z-40">
        <form className="flex flex-col md:flex-row gap-4">
          <CustomSelect
            id="userId"
            label="User"
            options={options}
            value={formData.userId}
            onChange={handleUserSelect}
            placeholder="select user"
            searchable
            name="userId"
            width={200}
            error={errors.userId}
            disabled={isEditingRef.current}
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
          data={assigned_users}
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
            {isEditingRef.current ? "Update" : "Assign"}
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default React.memo(AssignUserForm);
