import React, { useRef, useState } from "react";
import { columnHelper } from "../../util/tableHelper";
import Switch from "../common/Switch";
import Badge from "../common/Badge";
import { useGetPaginatedUser } from "../../hooks/query/user/useGetPaginatedUser";
import { DataTable } from "../table/DataTable";
import EditButton from "../common/EditButton";
import { FiUserPlus } from "react-icons/fi";
import { useStatusMutation } from "../../hooks/query/common/useStatusMutation";
import { useShowModal } from "../../hooks/useShowModal";
import Modal from "../common/Modal";
import AssignRoleForm from "./AssignRoleForm";
import Form from "./Form";
import Tooltip from "../common/Tooltip";

const Body = ({ searchTerm }) => {
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const userIdRef = useRef(null);
  const currentUserRef = useRef(null);

  const { data, isFetching } = useGetPaginatedUser([
    "user",
    {
      page: pageIndex + 1,
      limit: pageSize,
      active: true,
    },
  ]);
  const statusMutation = useStatusMutation(["user"]);
  const {
    isOpen: isAssignRoleModalOpen,
    showModal: showAssignRoleModal,
    closeModal: closeAssignRoleModal,
  } = useShowModal();

  const {
    isOpen: isUserEditModalOpen,
    showModal: showUserEditModal,
    closeModal: closeUserEditModal,
  } = useShowModal();

  const columns = [
    columnHelper.display({
      header: "S.N",
      cell: ({ row: { index } }) => {
        return pageIndex * pageSize + index + 1;
      },
    }),
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("nameLocal", {
      header: "Local Name",
    }),
    columnHelper.accessor("code", {
      header: "Code",
    }),
    columnHelper.accessor("mobileNumber", {
      header: "Contact Number",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.display({
      header: "Roles",
      cell: ({ row: { original } }) => {
        return (
          <>
            {original?.roles?.length > 0 ? (
              <div className="flex gap-1">
                {original.roles.map((role) => (
                  <Badge key={role.id} badge={role.name} />
                ))}
              </div>
            ) : (
              <Badge badge={"null"} />
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("active", {
      header: "Status",
      cell: ({ row: { original } }) => (
        <div className="flex items-center">
          <Switch
            enabled={original.active}
            onChange={() => statusMutation.mutate(original.id)}
            id={original.id}
          />
          <Badge badge={original.active ? "Active" : "Inactive"} />
        </div>
      ),
    }),
    columnHelper.display({
      header: "Actions",
      cell: ({ row: { original } }) => {
        const { id, name, email, mobileNumber, nameLocal } = original;
        return (
          <div className="flex gap-4">
            <EditButton
              onClick={() =>
                handleOpenEditUserModal({
                  id,
                  name,
                  email,
                  mobileNumber,
                  nameLocal,
                })
              }
            />
            <Tooltip content="assign role" position="left">
              <button
                className="cursor-pointer"
                onClick={() => handleOpenAssignRoleModal(original.id)}
              >
                <FiUserPlus size={15} />
              </button>
            </Tooltip>
          </div>
        );
      },
      meta: {
        sticky: "right", 
      },
    }),
  ];

  function handleOpenAssignRoleModal(userId) {
    userIdRef.current = userId;
    showAssignRoleModal();
  }

  function handleCloseAssignRoleModal() {
    userIdRef.current = null;
    closeAssignRoleModal();
  }

  function handleOpenEditUserModal(user) {
    currentUserRef.current = user;
    showUserEditModal();
  }

  function handleCloseEditUserModal() {
    currentUserRef.current = null;
    closeUserEditModal();
  }

  return (
    <>
      <Modal
        title="Assign Role"
        isOpen={isAssignRoleModalOpen}
        onClose={handleCloseAssignRoleModal}
      >
        {isAssignRoleModalOpen && (
          <AssignRoleForm
            key={userIdRef.current}
            userId={userIdRef.current}
            closeAssignRoleModal={handleCloseAssignRoleModal}
          />
        )}
      </Modal>
      <Modal title="Edit User" isOpen={isUserEditModalOpen} onClose={handleCloseEditUserModal}>
        <Form editingUser={currentUserRef.current} closeModal={handleCloseEditUserModal} />
      </Modal>
      <section className="mt-4 overflow-x-auto">
        <DataTable
          data={data?.data?.records || []}
          columns={columns}
          totalCount={data?.data?.total}
          pagination={{ pageIndex, pageSize }}
          onPaginationChange={setPagination}
          pageCount={Math.ceil(data?.data?.total / pageSize)}
          isServerSide={true}
          isLoading={isFetching}
          enableFuzzyFilter={true}
          enableVirtualization={true}
          globalFilter={searchTerm}
        />
      </section>
    </>
  );
};

export default Body;
