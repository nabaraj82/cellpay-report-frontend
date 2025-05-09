import React, { useCallback, useMemo, useRef } from "react";
import { useStatusMutation } from "@/hooks/query/common/useStatusMutation";
import { useShowModal } from "@/hooks/useShowModal";
import { columnHelper } from "@/util/tableHelper";
import Switch from "@/components/common/Switch";
import Badge from "@/components/common/Badge";
import AvatarGroup from "@/components/common/AvatarGroup";
import EditButton from "@/components/common/EditButton";
import Tooltip from "@/components/common/Tooltip";
import { FiSettings, FiUserPlus } from "react-icons/fi";
import Toast from "@/components/common/Toast";
import Modal from "@/components/common/Modal";
import RoleForm from "@/components/role-setup/RoleForm";
import RoleSetupForm from "@/components/role-setup/role-setup-form";
import AssignUserForm from "@/components/role-setup/AssignUserForm";
import { DataTable } from "@/components/table/DataTable";

const Body = ({ data = [], searchTerm = "" }) => {
  // Refs for managing state without re-renders
  const roleIdRef = useRef(null);
  const editingRoleRef = useRef(null);

  // Status mutation with optimized query key
  const statusMutation = useStatusMutation(["role"]);

  // Modal management hooks
  const roleSetupModal = useShowModal();
  const roleFormModal = useShowModal();
  const assignRoleModal = useShowModal();

  // Memoized columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "s.n",
        header: "S.N",
        cell: ({ row: { index } }) => index + 1,
      }),
      columnHelper.accessor("name", {
        header: "Role Name",
      }),
      columnHelper.accessor("isActive", {
        header: "Status",
        cell: ({ row: { original } }) => (
          <div className="flex items-center">
            <Switch
              enabled={original.isActive}
              onChange={() => statusMutation.mutate(original.id)}
              id={original.id}
            />
            <Badge badge={original.isActive ? "Active" : "Inactive"} />
          </div>
        ),
      }),
      columnHelper.accessor("userCount", {
        header: "Users",
        cell: ({ row: { original } }) => (
          <div className="flex gap-1">
            {original.userCount === 0 ? (
              <span className="tracking-wider">assign user</span>
            ) : (
              <AvatarGroup userCount={original.userCount} />
            )}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row: { original } }) => (
          <div className="flex gap-4">
            <EditButton onClick={() => handleOpenEditRoleModal(original)} />
            <Tooltip content="assign permission" position="left">
              <button
                className="cursor-pointer"
                onClick={() => handleOpenRoleSetupModal(original.id)}
                aria-label="Assign permissions"
              >
                <FiSettings size={15} />
              </button>
            </Tooltip>
            <Tooltip content="assign user" position="left">
              <button
                className="cursor-pointer"
                onClick={() => handleOpenAssignRoleModal(original.id)}
                aria-label="Assign users"
              >
                <FiUserPlus size={15} />
              </button>
            </Tooltip>
          </div>
        ),
      }),
    ],
    [statusMutation]
  );

  // Modal handlers with useCallback for stable references
  const handleOpenRoleSetupModal = useCallback((roleId) => {
    roleIdRef.current = roleId;
    roleSetupModal.showModal();
  }, []);

  const handleCloseRoleSetupModal = useCallback(() => {
    roleIdRef.current = null;
    roleSetupModal.closeModal();
  }, []);

  const handleOpenEditRoleModal = useCallback((role) => {
    editingRoleRef.current = role;
    roleFormModal.showModal();
  }, []);

  const handleCloseEditRoleModal = useCallback(() => {
    editingRoleRef.current = null;
    roleFormModal.closeModal();
  }, []);

  const handleOpenAssignRoleModal = useCallback((roleId) => {
    roleIdRef.current = roleId;
    assignRoleModal.showModal();
  }, []);

  const handleCloseAssignRoleModal = useCallback(() => {
    roleIdRef.current = null;
    assignRoleModal.closeModal();
  }, []);

  // Memoized DataTable props
  const dataTableProps = useMemo(
    () => ({
      data,
      columns,
      isServerSide: false,
      enableFuzzyFilter: true,
      enableVirtualization: true,
      globalFilter: searchTerm,
    }),
    [data, columns, searchTerm]
  );

  return (
    <>
      <Toast />

      {/* Edit Role Modal */}
      <Modal
        title="Edit Role"
        isOpen={roleFormModal.isOpen}
        onClose={handleCloseEditRoleModal}
      >
        <RoleForm
          onCloseModal={handleCloseEditRoleModal}
          editingRole={editingRoleRef.current}
        />
      </Modal>

      {/* Role Setup Modal */}
      <Modal
        title="Role Setup"
        isOpen={roleSetupModal.isOpen}
        onClose={handleCloseRoleSetupModal}
        isCloseButton
      >
        <RoleSetupForm
          key={roleIdRef.current}
          roleId={roleIdRef.current}
          onCloseModal={handleCloseRoleSetupModal}
        />
      </Modal>

      {/* Assign Role Modal */}
      <Modal
        title="Assign Role"
        isOpen={assignRoleModal.isOpen}
        onClose={handleCloseAssignRoleModal}
      >
        {assignRoleModal.isOpen && (
          <AssignUserForm
            key={roleIdRef.current}
            roleId={roleIdRef.current}
            closeAssignRoleModal={handleCloseAssignRoleModal}
          />
        )}
      </Modal>

      {/* Data Table Section */}
      <section className="mt-4 overflow-x-auto">
        <DataTable {...dataTableProps} />
      </section>
    </>
  );
};

export default React.memo(Body);
