import React, { useState } from 'react'
import PageContainer from '../../components/common/PageContainer'
import Header from '../../components/role-setup/Header'
import Body from '../../components/role-setup/Body'
import { useGetAll } from '../../hooks/query/common/useGetAll'

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