import PageContainer from "@/components/common/PageContainer";
import Body from "@/components/screen-setup/Body";
import Header from "@/components/screen-setup/Header";
import { useGetAll } from "@/hooks/query/common/useGetAll";
import React, { useState } from "react";


const ScreenSetup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetAll(["screen"]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <PageContainer>
      <Header searchTerm={searchTerm} onChange={handleChange} />
      <Body data={data || []} globalFilter={searchTerm}  />
    </PageContainer>
  );
};

export default ScreenSetup;
