import ButtonDanger from "@/components/common/ButtonDanger";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import ButtonSecondary from "@/components/common/ButtonSecondary";
import CustomSelect from "@/components/common/CustomSelect";
import DeleteButton from "@/components/common/DeleteButton";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import EditButton from "@/components/common/EditButton";
import Input from "@/components/common/Input";
import { DataTable } from "@/components/table/DataTable";
import { useGetAll } from "@/hooks/query/common/useGetAll";
import { useAssignRoleMutation } from "@/hooks/query/role/useAssignRoleMutation";
import { useRemoveUserRoleMutation } from "@/hooks/query/role/useRemoveUserRoleMutation";
import { useShowModal } from "@/hooks/useShowModal";
import { columnHelper } from "@/util/tableHelper";
import { useValidateForm } from "@/validations/hooks/useValidateForm";
import { assignUserValidationSchema } from "@/validations/schema/assignUserValidationSchema";
import React, { useRef, useState } from "react";


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
  const { data: unassigned_users } = useGetAll(
    ["user_role/users", roleId, "unasigned"],
    {
      assigned: false,
      id: roleId,
    },
    !!roleId
  );
  const { data: assigned_users } =
    useGetAll(
      ["user_role/users", roleId, "asigned"],
      {
        assigned: true,
        id: roleId,
      },
      !!roleId
    );

  const assignRoleMutation = useAssignRoleMutation(roleId, {
    onSuccess: () => {
      isEditingRef.current = false;
      handleReset();
    },
  });

  const removeUserRoleMutation = useRemoveUserRoleMutation({
    queryKey: ['user_role/user'],
    onSuccess: () => {
      userDeleteRef.current = null;
      closeDeleteModal();
    }, 
    onError: () => {
    userDeleteRef.current = null;
    closeDeleteModal();
    }
  })

  const { errors, setErrors, validateForm } = useValidateForm(
    formData,
    assignUserValidationSchema
  );

  const options =
    unassigned_users?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];
  if (isEditingRef.current) {
    const user = assigned_users.find((item) => item.id === formData.userId);
    const selectedOption = {
      value: user.id,
      label: user.name,
    };
    options.push(selectedOption);
  }


  const columns = [
    columnHelper.display({
      header: "S.N",
      cell: ({ row: { index } }) => {
        return index + 1;
      },
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
      cell: ({ row: { original } }) => {
        return (
          <div className="flex gap-4">
            <EditButton onClick={() => handleEdit(original)} />
            <DeleteButton onClick={() => handleOpenDeleteConfirmModal(original)} />
          </div>
        );
      },
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

  function handleEdit(user) {
    if (Object.keys(errors).length !== 0) {
      setErrors({});
    }
    isEditingRef.current = true;
    const { id, effectiveFrom, effectiveTo } = user;
    setFormData({
      userId: id,
      effectiveFrom,
      effectiveTo,
    });
  }
  function handleUserSelect(userId) {
    if (errors["userId"]) {
      setErrors((prevState) => {
        const newErrors = { ...prevState };
        delete newErrors["userId"];
        return newErrors;
      });
    }
    setFormData((prevState) => ({
      ...prevState,
      userId,
    }));
  }

  function handleReset() {
    isEditingRef.current = false;
    setFormData(initialFormData);
     setErrors({});
  }

  function handleOpenDeleteConfirmModal(user) {
    userDeleteRef.current = {
      userId: user.id,
      roleId,
    }
    showDeleteModal();
  }

  function handleDeleteConfirm() {
    removeUserRoleMutation.mutate(userDeleteRef.current);
  }

  async function handleSubmit() {
    const isValid = await validateForm();
    if (isValid) {
      if (isEditingRef.current) {
        const data = { ...formData, roleId, id: formData.userId };
        assignRoleMutation.mutate(data);
      } else {
        const data = { ...formData, roleId };
        assignRoleMutation.mutate(data);
      }
    }
  }

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
      <div className="flex flex-col gap-5 relative">
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
            error={errors["userId"]}
            disabled={isEditingRef.current}
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
          data={assigned_users || []}
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
            {isEditingRef.current ? "Update" : " Assign"}
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default AssignUserForm;
