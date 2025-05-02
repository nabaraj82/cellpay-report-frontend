import { createColumnHelper } from "@tanstack/react-table";
import React, { useRef } from "react";
import EditButton from "../common/EditButton";
import Switch from "../common/Switch";
import Badge from "../common/Badge";
import AvatarGroup from "../common/AvatarGroup";
import { FiSettings, FiUserPlus } from "react-icons/fi";
import { useStatusMutation } from "../../hooks/query/common/useStatusMutation";
import Toast from "../common/Toast";
import { useShowModal } from "../../hooks/useShowModal";
import Modal from "../common/Modal";
import RoleSetupForm from "./role-setup-form";
import RoleForm from "./RoleForm";
import AssignUserForm from "./AssignUserForm";
import { DataTable } from "../table/DataTable";
import { columnHelper } from "../../util/tableHelper";
import Tooltip from "../common/Tooltip";

const Body = ({ data, searchTerm }) => {
  const statusMutation = useStatusMutation(["role"]);
  const roleIdRef = useRef(null);
  const editingRoleRef = useRef(null);
  const {
    isOpen: isRoleSetupModalOpen,
    showModal: showRoleSetupModal,
    closeModal: closeRoleSetupModal,
  } = useShowModal();

  const {
    isOpen: isRoleFormModalOpen,
    showModal: showRoleFormModal,
    closeModal: closeRoleFromModal,
  } = useShowModal();
  const {
    isOpen: isAssignRoleModalOpen,
    showModal: showAssignRoleModal,
    closeModal: closeAssignRoleModal,
  } = useShowModal();

  const columns = [
    columnHelper.display({
      id: "s.n",
      header: "S.N",
      cell: ({ row: { index } }) => {
        return index + 1;
      },
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
      cell: ({ row: { original } }) => {
        return (
          <div className="flex gap-1">
            {original.userCount === 0 ? (
              <span className="tracking-wider">assign user</span>
            ) : (
              <AvatarGroup userCount={original.userCount} />
            )}
          </div>
        );
      },
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
          >
            <FiSettings size={15} />
          </button>
          </Tooltip>
          <Tooltip content="assign user" position="left">
          <button
            className="cursor-pointer"
            onClick={() => handleOpenAssignRoleModal(original.id)}
          >
            <FiUserPlus size={15} />
          </button>
          </Tooltip>
        </div>
      ),
    }),
  ];

  function handleOpenRoleSetupModal(roleId) {
    roleIdRef.current = roleId;
    showRoleSetupModal();
  }

  function handleCloseRoleSetupModal() {
    roleIdRef.current = null;
    closeRoleSetupModal();
  }

  function handleOpenEditRoleModal(role) {
    editingRoleRef.current = role;
    showRoleFormModal();
  }

  function handleCloseEditRoleModal() {
    editingRoleRef.current = null;
    closeRoleFromModal();
  }

  function handleOpenAssignRoleModal(roleId) {
    roleIdRef.current = roleId;
    showAssignRoleModal();
  }

  function handleCloseAssignRoleModal() {
    roleIdRef.current = null;
    closeAssignRoleModal();
  }

  return (
    <>
      <Toast />
      <Modal
        title="Edit Role"
        isOpen={isRoleFormModalOpen}
        onClose={handleCloseEditRoleModal}
      >
        <RoleForm
          onCloseModal={handleCloseEditRoleModal}
          editingRole={editingRoleRef.current}
        />
      </Modal>
      <Modal
        title="Role Setup"
        isOpen={isRoleSetupModalOpen}
        onClose={handleCloseRoleSetupModal}
        isCloseButton
      >
        <RoleSetupForm
          key={roleIdRef.current}
          roleId={roleIdRef.current}
          onCloseModal={handleCloseRoleSetupModal}
        />
      </Modal>
      <Modal
        title="Assign Role"
        isOpen={isAssignRoleModalOpen}
        onClose={handleCloseAssignRoleModal}
      >
        {isAssignRoleModalOpen && (
          <AssignUserForm
            key={roleIdRef.current}
            roleId={roleIdRef.current}
            closeAssignRoleModal={handleCloseAssignRoleModal}
          />
        )}
      </Modal>
      <Toast />
      <section className="mt-4 overflow-x-auto">
       <DataTable
                 data={data}
                 columns={columns}
                 isServerSide={false}
                 enableFuzzyFilter={true}
                 enableVirtualization={true}
          globalFilter={searchTerm}
        />
      </section>
    </>
  );
};

export default Body;
