import React, { useRef } from "react";
import EditButton from "@components/common/EditButton";
import DeleteButton from "@/components/common/DeleteButton";

import Modal from "@/components/common/Modal";
import Toast from "@/components/common/Toast";
import ButtonDanger from "@/components/common/ButtonDanger";
import Switch from "@/components/common/Switch";
import Badge from "@/components/common/Badge";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import ButtonSecondary from "@/components/common/ButtonSecondary";
import { DataTable } from "@/components/table/DataTable";
import Form from "@/components/privilege-setup/Form";
import { useStatusMutation } from "@/hooks/query/common/useStatusMutation";
import { useDeleteMutation } from "@/hooks/query/common/useDeleteMutation";
import { useShowModal } from "@/hooks/useShowModal";
import { columnHelper } from "@/util/tableHelper";

const Body = ({ data, searchTerm }) => {
    const itemToDeleteRef = useRef(null);
     const editPrivilegeRef = useRef(null);
  const statusMutation = useStatusMutation(["privilege"]);
  const deleteMutation = useDeleteMutation(["privilege"], {
    onSuccess: () => {
      itemToDeleteRef.current = null;
      closeDeleteModal();
    },
    onError: () => {
      closeDeleteModal();
    },
  });
  const {
    isOpen: isDeleteModalOpen,
    showModal: showDeleteModal,
    closeModal: closeDeleteModal,
    } = useShowModal();
      const {
        isOpen: isEditModalOpen,
        showModal: showEditModal,
        closeModal: closeEditModal,
      } = useShowModal();
  const columns = [
    columnHelper.display({
      header: "S.N",
      cell: ({ row: { index } }) => {
        return index + 1;
      },
    }),
    columnHelper.accessor("code", {
      header: "Privilege Code",
    }),
    columnHelper.accessor("name", {
      header: "Privilege Name",
    }),
    columnHelper.accessor("description", {
      header: "Description",
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
    columnHelper.display({
      header: "Actions",
      cell: ({ row: { original } }) => {
        return (
          <div className="flex gap-2">
            <EditButton onClick={() => handleEdit(original)} />
            <DeleteButton onClick={() => handleDelete(original.id)} />
          </div>
        );
      },
    }),
    ];
    
      function handleEdit(privilege) {
        const { id, code, name, description } = privilege;
        editPrivilegeRef.current = { id, code, name, description };
        showEditModal();
    }
    
      function handleCloseEdit() {
        closeEditModal();
    }

  function handleDelete(id) {
    itemToDeleteRef.current = id;
    showDeleteModal(true);
  }
    function handleConfirmDelete() {
       if (itemToDeleteRef.current) {
         deleteMutation.mutate(itemToDeleteRef.current);
       }
  }
  return (
    <>
      <Toast />
      <Modal
        title="Edit Screen"
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      >
        <Form
          key={editPrivilegeRef.current?.id || "update"}
          editingData={editPrivilegeRef.current}
          closeModal={handleCloseEdit}
        />
      </Modal>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      >
        <div className="flex gap-2 justify-end md:min-w-[20rem] mt-4">
          <ButtonSecondary type="button" onClick={closeDeleteModal}>
            No
          </ButtonSecondary>
          <ButtonDanger type="button" onClick={handleConfirmDelete}>
            Yes
          </ButtonDanger>
        </div>
      </DeleteConfirmationModal>
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
