import React, { useCallback, useState } from "react";
import Header from "../../components/module-setup/Header";
import Body from "../../components/module-setup/Body";
import PageContainer from "../../components/common/PageContainer";
import { useGetAll } from "../../hooks/query/common/useGetAll";

const ModuleSetup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetAll(["module"]);
  const handleChange = useCallback(
    (e) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );
  return (
    <PageContainer>
      <Header searchTerm={searchTerm} onChange={handleChange} />
      <Body data={data || []} searchTerm={searchTerm} />
    </PageContainer>
  );
};

export default ModuleSetup;
