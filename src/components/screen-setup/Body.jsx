import {  useRef} from "react";
import { useDeleteMutation } from "@/hooks/query/common/useDeleteMutation";
import { useShowModal } from "@/hooks/useShowModal";
import { columnHelper } from "@/util/tableHelper";
import DeleteButton from "@/components/common/DeleteButton";
import Toast from "@/components/common/Toast";
import Modal from "@/components/common/Modal";
import Form from "@/components/screen-setup/Form";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import ButtonSecondary from "@/components/common/ButtonSecondary";
import ButtonDanger from "@/components/common/ButtonDanger";
import { DataTable } from "@/components/table/DataTable";
import EditButton from "@/components/common/EditButton";


const Body = ({ data, globalFilter }) => {

  const editScreenRef = useRef(null);

  const itemToDeleteRef = useRef(null);
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

  const deleteMutation = useDeleteMutation(["screen"], {
    onSuccess: () => {
      itemToDeleteRef.current = null;
      closeDeleteModal();
    },
    onError: () => {
      closeDeleteModal();
    },
  });

  function handleDelete(id) {
    itemToDeleteRef.current = id;
    showDeleteModal(true);
  }

  function handleEdit(screenData) {
    const { id, code, name, description } = screenData;
    editScreenRef.current = { id, code, name, description };
    showEditModal();
  }

  function handleCloseEdit() {
    closeEditModal();
  }

  function handleConfirmDelete() {
    if (itemToDeleteRef.current) {
      deleteMutation.mutate(itemToDeleteRef.current);
    }
  }

  const columns = [
    columnHelper.accessor("id", {
      header: "S.N",
      cell: ({ row: { index } }) => {
        return index + 1;
      },
    }),
    columnHelper.accessor("code", {
      header: "Screen Code",
    }),
    columnHelper.accessor("name", {
      header: "Screen Name",
    }),
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-4">
          <EditButton onClick={() => handleEdit(info.row.original)} />
          <DeleteButton onClick={() => handleDelete(info.row.original.id)} />
        </div>
      ),
    }),
  ];

  return (
    <>
      <Toast />
      <Modal
        title="Edit Screen"
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      >
        <Form
          key={editScreenRef.current?.id || "update"}
          editingData={editScreenRef.current}
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
          globalFilter={globalFilter}
        />
      </section>
    </>
  );
};

export default Body;
