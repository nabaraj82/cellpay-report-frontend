import React, { useEffect, useMemo, useRef, useState } from "react";
import ButtonDanger from "@/components/common/ButtonDanger";
import ButtonSecondary from "@/components/common/ButtonSecondary";
import CustomSelect from "@/components/common/CustomSelect";
import DeleteButton from "@/components/common/DeleteButton";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { useRPSMutation } from "@/hooks/query/role/useRPSMutation";
import { useShowModal } from "@/hooks/useShowModal";

const Sidebar = ({ data, roleId, setActiveScreenId }) => {
  const [selectedScreen, setSelectedScreen] = useState([]);
  const screenIdRef = useRef(null);

  const { isOpen, showModal, closeModal } = useShowModal();

  const permissionMutation = useRPSMutation(["role", roleId], {
    onSuccess: () => {
      screenIdRef.current = null;
      setActiveScreenId(null);
      closeModal();
    },
  });

  useEffect(() => {
    setSelectedScreen(data.filter((item) => item.isSelected));
  }, [data]);

  const unSelectedScreens = useMemo(
    () => data.filter((item) => !item.isSelected),
    [data]
  );

  const options = useMemo(
    () =>
      unSelectedScreens.map((item) => ({ value: item.id, label: item.name })),
    [unSelectedScreens]
  );

  const handleScreenSelect = (screenId) => {
    const screen = data.find((item) => item.id === screenId);
    if (!screen || selectedScreen.some((s) => s.id === screenId)) return;

    setSelectedScreen((prev) => [screen, ...prev]);
    setActiveScreenId(screen.id);
  };

  const handleShowDeleteModal = (screenId) => {
    screenIdRef.current = screenId;
    showModal();
  };

  const handleCloseDeleteModal = () => {
    screenIdRef.current = null;
    closeModal();
  };

  const handleDeleteConfirmation = (e) => {
    // e.stopPropagation();
    const screenId = screenIdRef.current;

    // If screen is local only (not yet saved/selected), remove directly
    if (selectedScreen.some((s) => !s.isSelected && s.id === screenId)) {
      setSelectedScreen((prev) => prev.filter((s) => s.id !== screenId));
      setActiveScreenId(null);
      handleCloseDeleteModal();
      return;
    }

    // Otherwise trigger backend mutation
    permissionMutation.mutate({ roleId, screenId });
  };

  return (
    <>
      <DeleteConfirmationModal isOpen={isOpen} onClose={handleCloseDeleteModal}>
        <div className="flex justify-end gap-4 mt-4">
          <ButtonSecondary type="button" onClick={handleCloseDeleteModal}>
            No
          </ButtonSecondary>
          <ButtonDanger type="button" onClick={handleDeleteConfirmation}>
            Yes
          </ButtonDanger>
        </div>
      </DeleteConfirmationModal>

      <div className="bg-gray-100 dark:bg-gray-500 text-sm px-4 rounded-md py-2 min-h-[400px]">
        <CustomSelect
          options={options}
          value={null}
          onChange={handleScreenSelect}
          placeholder="Select Screen"
          searchable
        />

        <ul className="mt-4 flex flex-col gap-2 text-xs md:min-w-[10rem]">
          {selectedScreen.map((screen) => (
            <li
              key={screen.id}
              className="cursor-pointer"
              onClick={() => setActiveScreenId(screen.id)}
            >
              <div className="flex justify-between items-center gap-3 md:min-w-[9rem]">
                <span>{screen.name}</span>
                <DeleteButton
                  onClick={() => handleShowDeleteModal(screen.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
