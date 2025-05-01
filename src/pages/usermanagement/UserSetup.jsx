import React, { useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import Header from "../../components/userSetup/Header";
import Body from "../../components/userSetup/Body";

const UserSetup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <PageContainer>
      <Header searchTerm={searchTerm} onChange={handleChange} />
      <Body searchTerm={searchTerm} />
    </PageContainer>
  );
};

export default UserSetup;
