import React, { useCallback, useMemo, useState } from 'react'
import  Header  from '../../components/module-setup/Header'
import Body from '../../components/module-setup/Body'
import { useQuery } from '@tanstack/react-query';
import { getApi } from '../../api/getApi';

const ModuleSetup = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const { data, isFetching } = useQuery({
     queryKey: ["module"],
     queryFn: ({ signal }) => getApi("/module", {}, signal),
   });

   const handleChange = useCallback((e) => {
     setSearchTerm(e.target.value);
   }, [setSearchTerm]);

   const filteredData = useMemo(() => {
     if (isFetching) return [];
     return data.filter(
       (item) =>
         item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.name.toLowerCase().includes(searchTerm.toLowerCase())
     );
   }, [data, searchTerm, isFetching]);
  return (
    <section className="dark:text-gray-300">
      <Header searchTerm={searchTerm} onChange={handleChange} />
      <Body data={filteredData} isFetching={isFetching} />
    </section>
  );
}

export default ModuleSetup