import React, { useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import Header from "../../components/user-setup/Header";
import Body from "../../components/user-setup/Body";

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
