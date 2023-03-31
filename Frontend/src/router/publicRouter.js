import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const user=localStorage.getItem('user');
  
  if(user){
    return true
  } else {
    return false
  }
}

const  PublicRoutes=() =>{
const role=localStorage.getItem('role');
  const auth=useAuth()
  if(auth){
    if(role===1)
     return <Navigate to="/dashboardCustomer"/>
    else 
    return <Navigate to="/dashboardAgent"/>
  }

  else
  return  <Outlet/>
}

export default PublicRoutes;