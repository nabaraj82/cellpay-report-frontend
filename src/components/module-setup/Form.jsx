import React, { useEffect, useState } from "react";
import CustomSelect from "../common/CustomSelect";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import AddPrivilege from "./AddPrivilege";
import ButtonSecondary from "../common/ButtonSecondary";
import ButtonPrimary from "../common/ButtonPrimary";
import { useGetScreen } from "../../hooks/query/useGetScreen";
import { useValidateForm } from "../../validations/hooks/useValidateForm";
import {
  moduleSchema,
  privilegesValidationSchema,
} from "../../validations/schema/moduleSchema";
import { useGetModuleById } from "../../hooks/query/module/useGetModuleById";

const moduleInitialState = {
  name: "",
  code: "",
  description: "",
  screenId: "",
};

const privilagesInitialState = [
  {
    privilegeId: null,
    endPoints: [{ url: "", method: null }],
  },
];

const Form = ({ closeModal, moduleId }) => {
  const [formData, setFormData] = useState(moduleInitialState);
  const [privileges, setPrivileges] = useState(privilagesInitialState);
  const { data: screen } = useGetScreen();
  const { data: existingModule } = useGetModuleById(moduleId);
  const {
    errors: moduleErrors,
    setErrors: setModuleErrors,
    validateForm: validateModuleState,
  } = useValidateForm(formData, moduleSchema);

  const {
    errors: privilegeErrors,
    setErrors: setPrivilegeErrors,
    validateForm: validatePrivilegesState,
  } = useValidateForm(privileges, privilegesValidationSchema);

// useMutation({
//   mutationKey: ["save_module"],
//   mutationFn: (requestBody) => postApi("/module", requestBody),
// });

  useEffect(() => {
    if (existingModule) {
      setFormData({
        name: existingModule.name,
        code: existingModule.code,
        description: existingModule.description,
        screenId: existingModule.screenId,
      });
      if (existingModule.privilegeList) {
        setPrivileges(existingModule.privilegeList);
      }
    }
  }, [existingModule]);

  useEffect(() => {
    if (!moduleId) {
      setFormData(moduleInitialState);
      setPrivileges(privilagesInitialState);
    }
    setModuleErrors({});
    setPrivilegeErrors({});
  }, [moduleId]);

  const options =
    screen?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  function handleScreenSelect(value) {
    if (moduleErrors["screenId"]) {
      setModuleErrors((prevState) => {
        const newObj = { ...prevState };
        delete newObj["screenId"];
        return newObj;
      });
    }
    setFormData((prevState) => ({
      ...prevState,
      screenId: value,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (moduleErrors[name]) {
      setModuleErrors((prevState) => {
        const newObj = { ...prevState };
        delete newObj[name];
        return newObj;
      });
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isValidPrivileges = await validatePrivilegesState();
    const isValidModule = await validateModuleState();
    if (isValidModule && isValidPrivileges) {
      const newObj = { ...formData, privilegeList: privileges };
      if (moduleId) {
        console.log("call edit api");
      } else {
        console.log("call post api");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-sm w-full"
    >
      <CustomSelect
        label="Screen"
        options={options}
        value={formData.screenId}
        onChange={handleScreenSelect}
        placeholder="Choose an option"
        searchable
        name="screenId"
        error={moduleErrors["screenId"]}
      />
      <Input
        label="Module Code"
        type="text"
        value={formData.code}
        onChange={handleChange}
        name="code"
        error={moduleErrors["code"]}
      />
      <Input
        label="Module Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        name="name"
        error={moduleErrors["name"]}
      />
      <TextArea
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        name="description"
        error={moduleErrors["description"]}
      />
      <AddPrivilege
        privileges={privileges}
        setPrivileges={setPrivileges}
        errors={privilegeErrors}
        setErrors={setPrivilegeErrors}
      />
      <div className="flex justify-end gap-4">
        <ButtonSecondary type="button" onClick={closeModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default Form;
