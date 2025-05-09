import React, { useCallback, useMemo, useRef, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import Badge from "@/components/common/Badge";
import EditButton from "@/components/common/EditButton";
import Modal from "@/components/common/Modal";
import Switch from "@/components/common/Switch";
import Tooltip from "@/components/common/Tooltip";
import { DataTable } from "@/components/table/DataTable";
import AssignRoleForm from "@/components/user-setup/AssignRoleForm";
import Form from "@/components/user-setup/Form";
import { useStatusMutation } from "@/hooks/query/common/useStatusMutation";
import { useGetPaginatedUser } from "@/hooks/query/user/useGetPaginatedUser";
import { useShowModal } from "@/hooks/useShowModal";
import { columnHelper } from "@/util/tableHelper";

const UserManagementTable = ({ searchTerm }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { pageIndex, pageSize } = pagination;

  // Refs for modal data
  const userIdRef = useRef(null);
  const currentUserRef = useRef(null);

  const currentPage = {
    page: pageIndex + 1,
    limit: pageSize,
    active: true,
  };

  // Data fetching
  const { data, isFetching } = useGetPaginatedUser(["user", currentPage]);

  // Mutation for status change
  const statusMutation = useStatusMutation(["user"]);

  // Modal controls
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

  // Memoized data calculations
  const users = useMemo(() => data?.data?.records || [], [data]);
  const totalCount = useMemo(() => data?.data?.total || 0, [data]);
  const pageCount = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [totalCount, pageSize]
  );

  // Modal handlers
  const handleOpenAssignRoleModal = useCallback(
    (userId) => {
      userIdRef.current = userId;
      showAssignRoleModal();
    },
    [showAssignRoleModal]
  );

  const handleCloseAssignRoleModal = useCallback(() => {
    userIdRef.current = null;
    closeAssignRoleModal();
  }, [closeAssignRoleModal]);

  const handleOpenEditUserModal = useCallback(
    (user) => {
      currentUserRef.current = user;
      showUserEditModal();
    },
    [showUserEditModal]
  );

  const handleCloseEditUserModal = useCallback(() => {
    currentUserRef.current = null;
    closeUserEditModal();
  }, [closeUserEditModal]);

  // Memoized table columns
  const columns = useMemo(
    () => [
      columnHelper.display({
        header: "S.N",
        cell: ({ row: { index } }) => pageIndex * pageSize + index + 1,
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
        cell: ({ row: { original } }) =>
          original?.roles?.length > 0 ? (
            <div className="flex gap-1">
              {original.roles.map((role) => (
                <Badge key={role.id} badge={role.name} />
              ))}
            </div>
          ) : (
            <Badge badge="------" />
          ),
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
                  onClick={() => handleOpenAssignRoleModal(id)}
                  aria-label={`Assign role to ${name}`}
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
    ],
    [
      pageIndex,
      pageSize,
      statusMutation,
      handleOpenEditUserModal,
      handleOpenAssignRoleModal,
    ]
  );

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

      <Modal
        title="Edit User"
        isOpen={isUserEditModalOpen}
        onClose={handleCloseEditUserModal}
      >
        <Form
          editingUser={currentUserRef.current}
          closeModal={handleCloseEditUserModal}
        />
      </Modal>

      <section className="mt-4 overflow-x-auto">
        <DataTable
          data={users}
          columns={columns}
          totalCount={totalCount}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={pageCount}
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

export default React.memo(UserManagementTable);
