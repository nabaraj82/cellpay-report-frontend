import { createColumnHelper } from "@tanstack/react-table";
import React, { useRef } from "react";
import Badge from "../common/Badge";
import { useShowModal } from "../../hooks/useShowModal";
import Form from "./Form";
import Modal from "../common/Modal";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import ButtonSecondary from "../common/ButtonSecondary";
import ButtonDanger from "../common/ButtonDanger";
import EditButton from "../common/EditButton";
import DeleteButton from "../common/DeleteButton";
import { useDeleteMutation } from "../../hooks/query/common/useDeleteMutation";
import Toast from "../common/Toast";
import { DataTable } from "../table/DataTable";
import { columnHelper } from "../../util/tableHelper";

const Body = ({ data, searchTerm }) => {
  const itemToDeleteRef = useRef(null);
  const moduleIdRef = useRef(null);

  const deleteMutation = useDeleteMutation(["module"], {
    onSuccess: () => {
      closeDeleteModal();
    },
  });
  const {
    isOpen: isEditModalOpen,
    showModal: showEditModal,
    closeModal: closeEditModal,
  } = useShowModal();

  const {
    isOpen: isDeleteModalOpen,
    showModal: showDeleteModal,
    closeModal: closeDeleteModal,
  } = useShowModal();

  function handleEdit(module) {
    showEditModal();
    moduleIdRef.current = module.id;
  }

  function handleCloseEditModal() {
    moduleIdRef.current = null;
    closeEditModal();
  }

  function handleDelete(id) {
    itemToDeleteRef.current = id;
    showDeleteModal(true);
  }

  function handleConfirmDelete() {
    console.log("Delete id: ", itemToDeleteRef.current);
    deleteMutation.mutate(itemToDeleteRef.current);
  }

  const columns = [
    columnHelper.display({
      header: "S.N",
      cell: ({ row: { index } }) => {
        return index + 1;
      },
    }),
    columnHelper.accessor("code", {
      header: "Module Code",
    }),
    columnHelper.accessor("name", {
      header: "Module Name",
    }),
    columnHelper.accessor("screenName", {
      header: "Screen Name",
    }),
    columnHelper.display({
      header: "Privilege",
      cell: ({ row: { original } }) => {
        const { privilege, id } = original;
        return (
          <div className="inline-flex gap-2">
            {privilege.map((badge) => (
              <Badge key={`${id}-${badge}`} badge={badge} />
            ))}
          </div>
        );
      },
    }),
    columnHelper.display({
      header: "Actions",
      cell: (info) => {
        return (
          <div className="flex gap-4">
            <EditButton onClick={() => handleEdit(info.row.original)} />
            <DeleteButton onClick={() => handleDelete(info.row.original.id)} />
          </div>
        );
      },
    }),
  ];
  return (
    <>
      <Toast />
      <Modal
        title="Add Module"
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
      >
        <Form
          closeModal={handleCloseEditModal}
          moduleId={moduleIdRef.current}
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
