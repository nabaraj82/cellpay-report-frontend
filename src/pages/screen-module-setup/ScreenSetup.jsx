import React, { useState } from "react";
import Header from "../../components/screen-setup/Header";
import Body from "../../components/screen-setup/Body";
import { useGetAll } from "../../hooks/query/common/useGetAll";
import PageContainer from "../../components/common/PageContainer";

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
