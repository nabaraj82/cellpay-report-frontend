import PageContainer from "@/components/common/PageContainer";
import Body from "@/components/privilege-setup/Body";
import Header from "@/components/privilege-setup/Header";
import { useGetAll } from "@/hooks/query/common/useGetAll";
import React, { useState } from "react";


const PrivilageSetup = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetAll(["privilege"]);
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }
  return (
    <PageContainer>
      <Header searchTerm={searchTerm} onChange={handleChange} />
      <Body data={data || []} searchTerm={searchTerm} />
    </PageContainer>
  );
};

export default PrivilageSetup;
