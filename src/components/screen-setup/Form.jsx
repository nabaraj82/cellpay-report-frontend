import React from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import ButtonSecondary from "../common/ButtonSecondary";
import ButtonPrimary from "../common/ButtonPrimary";

const Form = ({ handleSubmit, handleChange, formData, closeModal, errors }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
      <Input
        label="Screen Code"
        type="text"
        value={formData.code}
        onChange={handleChange}
        name="code"
        error={errors["code"]}
      />
      <Input
        label="Screen Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        name="name"
        error={errors["name"]}
      />
      <TextArea
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        name="description"
        error={errors["description"]}
      />
      <div className="flex gap-8 justify-end">
        <ButtonSecondary type="button" onClick={closeModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default Form;
