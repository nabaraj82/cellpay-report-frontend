import PageContainer from "@/components/common/PageContainer";
import Body from "@/components/user-setup/Body";
import Header from "@/components/user-setup/Header";
import React, { useState } from "react";


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
