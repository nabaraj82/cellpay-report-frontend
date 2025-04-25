import { createColumnHelper } from "@tanstack/react-table";
import React, { useRef, useState } from "react";
import Badge from "../common/Badge";
import { FiDelete, FiEdit } from "react-icons/fi";
import Table from "../NormalTable/Table";
import { useShowModal } from "../../hooks/useShowModal";
import Form from "./Form";
import Modal from "../common/Modal";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import ButtonSecondary from "../common/ButtonSecondary";
import ButtonDanger from "../common/ButtonDanger";
import EditButton from "../common/EditButton";
import DeleteButton from "../common/DeleteButton";

const Body = ({ data, isFetching }) => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const moduleIdRef = useRef(null);
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
  
  const columnHelper = createColumnHelper();

  function handleEdit(module) {
    showEditModal();
    moduleIdRef.current = module.id;
  }

  function handleCloseEditModal() {
    moduleIdRef.current = null;
    closeEditModal();
  }

   function handleDelete(id) {
     setItemToDelete(id);
     showDeleteModal(true);
   }

  function handleConfirmDelete() {
    
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
        <Table data={data} columns={columns} isFetching={isFetching} />
      </section>
    </>
  );
};

export default Body;
