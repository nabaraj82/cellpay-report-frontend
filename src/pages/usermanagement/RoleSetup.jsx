import PageContainer from '@/components/common/PageContainer';
import Body from '@/components/role-setup/Body';
import Header from '@/components/role-setup/Header';
import { useGetAll } from '@/hooks/query/common/useGetAll';
import React, { useState } from 'react'


const RoleSetup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useGetAll(['role']);


    function handleChange(e) {
      setSearchTerm(e.target.value);
  };

  return (
    <PageContainer>
      <Header searchTerm={searchTerm} onChange={handleChange} />
      <Body data={data || []} searchTerm={searchTerm} />
   </PageContainer>
  )
}

export default RoleSetup