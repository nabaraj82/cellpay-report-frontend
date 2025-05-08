import ButtonDanger from "@/components/common/ButtonDanger";
import ButtonSecondary from "@/components/common/ButtonSecondary";
import CustomSelect from "@/components/common/CustomSelect";
import DeleteButton from "@/components/common/DeleteButton";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { useRPSMutation } from "@/hooks/query/role/useRPSMutation";
import { useShowModal } from "@/hooks/useShowModal";
import React, { useEffect, useRef, useState } from "react";


const Sidebar = ({ data, roleId, setActiveScreenId }) => {
  const [selectedScreen, setSelectedScreen] = useState(
    data.filter((item) => item.isSelected)
  );
  const { isOpen, showModal, closeModal } = useShowModal();

  const permissionMutation = useRPSMutation(["role", roleId], {
    onSuccess: () => {
      screenIdRef.current = null;
      setActiveScreenId(null);
      closeModal();
    },
  });
  const screenIdRef = useRef(null);
  useEffect(() => {
    setSelectedScreen(data.filter((item) => item.isSelected));
  }, [data]);
  const unSelectedScreen = data.filter((item) => !item.isSelected);
  const options = unSelectedScreen.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  function handleScreenSelect(screenId) {
    const newScreen = data.find((item) => item.id === screenId);

    setSelectedScreen((prevState) => {
      if (prevState.some((screen) => screen.id === screenId)) {
        return prevState;
      }
      const updatedScreen = [...prevState];
      updatedScreen.unshift(newScreen);
      return updatedScreen;
    });

    setActiveScreenId(newScreen.id);
  }

  function handleShowDeleteModal(screenId) {
    screenIdRef.current = screenId;
    showModal();
  }

  function handleCloseDeleteModal(e) {
    e.stopPropagation();
    screenIdRef.current = null;
    closeModal();
  }

  function handleDeleteConfirmation(e) {
    e.stopPropagation();
    if (selectedScreen.some((screen) => !screen.isSelected && screen.id === screenIdRef.current)) {
      setSelectedScreen((prevState) => {
        const updatedScreen = [...prevState].filter((screen) => screen.id !== screenIdRef.current);
        return updatedScreen
      });
      setActiveScreenId(null);
      closeModal();
     return
   }
    const body = {
      roleId,
      screenId: screenIdRef.current,
    };
    permissionMutation.mutate(body);
  }
  return (
    <>
      <DeleteConfirmationModal isOpen={isOpen} onClose={handleCloseDeleteModal}>
        <div className="flex justify-end gap-4 mt-4">
          <ButtonSecondary
            type="button"
            onClick={(e) => handleCloseDeleteModal(e)}
          >
            No
          </ButtonSecondary>
          <ButtonDanger
            type="button"
            onClick={(e) => handleDeleteConfirmation(e)}
          >
            Yes
          </ButtonDanger>
        </div>
      </DeleteConfirmationModal>
      <div className="bg-gray-100 dark:bg-gray-500 text-sm px-4 rounded-md py-2 min-h-[400px]">
        <CustomSelect
          options={options}
          value={screen.id}
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
              <div className="flex gap-3 justify-between items-center md:min-w-[9rem]">
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
