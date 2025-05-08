import React, { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import { useUpdateMutation } from "@/hooks/query/common/useUpdateMutation";
import Toast from "@/components/common/Toast";
import PasswordForm from "@/components/common/PasswordChangeForm";

const ChangePassword = () => {
  const [resetTrigger, setResetTrigger] = useState(false);
  const updateMutation = useUpdateMutation(["user/change-password"], {
    onSuccess: () => {
      setResetTrigger((prev) => !prev);
    },
  });

  return (
    <>
      <Toast />
      <PageContainer>
        <div className="flex">
          <PasswordForm
            onSubmit={(formData) => updateMutation.mutate(formData)}
            isLoading={updateMutation.isLoading}
            resetTrigger={resetTrigger}
          />
        </div>
      </PageContainer>
    </>
  );
};

export default ChangePassword;
