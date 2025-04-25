import { createColumnHelper } from "@tanstack/react-table";
import { FiDelete, FiEdit } from "react-icons/fi";
import Table from "../NormalTable/Table";
import { deleteApi } from "../../api/deleteApi";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import { useShowModal } from "../../hooks/useShowModal";
import ButtonSecondary from "../common/ButtonSecondary";
import ButtonDanger from "../common/ButtonDanger";
import { useState } from "react";
import { toast } from "react-toastify";
import Toast from "../common/Toast";
import Modal from "../common/Modal";
import Form from "./Form";
import { useValidateForm } from "../../validations/hooks/useValidateForm";
import screenSchema from "../../validations/schema/screenSchema";
import { putApi } from "../../api/putApi";
import EditButton from "../common/EditButton";
import DeleteButton from "../common/DeleteButton";

const initialFormData = {
  id: "",
  code: "",
  name: "",
  description: "",
};

const Body = ({ data, isPending }) => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingScreen, setEditingScreen] = useState(initialFormData);
  const { errors, setErrors, validateForm } = useValidateForm(
    editingScreen,
    screenSchema
  );
  const columnHelper = createColumnHelper();
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

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteApi(`/screen/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["screen"]);
      setItemToDelete(null);
      closeDeleteModal();
      toast.error("Screen deleted successfully");
    },
    onError: (error) => {
      closeDeleteModal();
      toast.error(JSON.stringify(error));
    },
  });

  const editMutation = useMutation({
    mutationFn: (data) => putApi("/screen", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["screen"]);
      closeEditModal();
    },
    onError: (error) => {
      closeEditModal();
      toast.error(JSON.stringify(error));
    },
  });

  function handleDelete(id) {
    setItemToDelete(id);
    showDeleteModal(true);
  }

  function handleEdit(screenData) {
    const { id, code, name, description } = screenData;
    showEditModal();
    setEditingScreen({ id, code, name, description });
  }

  function handleCloseEdit() {
    setErrors({});
    closeEditModal();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prevState) => {
        const newErrorObj = { ...prevState };
        delete newErrorObj[name];
        return newErrorObj;
      });
    }
    setEditingScreen((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      editMutation.mutate(editingScreen);
    }
  }

  function handleConfirmDelete() {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete);
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
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={editingScreen}
          closeModal={handleCloseEdit}
          errors={errors}
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
        <Table data={data} columns={columns} isFetching={isPending} />
      </section>
    </>
  );
};

export default Body;
