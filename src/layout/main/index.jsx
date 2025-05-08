import Modal from "@/components/common/Modal";
import PasswordChangeForm from "@/components/common/PasswordChangeForm";
import Toast from "@/components/common/Toast";
import { useUpdateMutation } from "@/hooks/query/common/useUpdateMutation";
import { useShowModal } from "@/hooks/useShowModal";
import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

const Main = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { isOpen, showModal, closeModal } = useShowModal();
    const auth = useAuth();

  const updateMutation = useUpdateMutation(["user/change-password"], {
    onSuccess: () => {
      auth.signoutRedirect()
    }
  });

  useEffect(() => {
    if (currentUser.userDetails.requirePasswordChange) {
      showModal();
    }
  }, [currentUser.userDetails.requirePasswordChange]);

  return (
    <>
      <Toast />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <PasswordChangeForm
          onSubmit={(formData) => updateMutation.mutate(formData)}
          isLoading={updateMutation.isLoading}
        />
      </Modal>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </main>
    </>
  );
};

export default Main;
