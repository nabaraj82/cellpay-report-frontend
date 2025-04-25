import React, {useMemo, useState } from "react";
import Header from "../../components/screen-setup/Header";
import Body from "../../components/screen-setup/Body";
import { useGetScreen } from "../../hooks/query/useGetScreen";

const ScreenSetup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending } = useGetScreen();


  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = useMemo(() => {
    if (isPending) return [];
    return data.filter(
      (item) =>
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <section className="dark:text-gray-300">
      <Header searchTerm={searchTerm} onChange={handleChange} />
      <Body data={filteredData} isPending={isPending} />
    </section>
  );
};

export default ScreenSetup;
