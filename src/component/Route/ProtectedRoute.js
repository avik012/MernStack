import React from 'react'
import { useSelector } from 'react-redux'
import { Route, redirect, Outlet ,Navigate} from 'react-router-dom'

// const ProtectedRoute = ({ component:Component, ...rest }) => {
// const { loading, isAuthenticated,} =useSelector(state=>state.user)
// const Redirect=redirect();
//   return (
//     <>
//     {!loading && (
//         <Route 
//         {...rest}
//         render={(props)=>{
//             if(isAuthenticated === false){
//                 return <Redirect to="/login" />
//             }
//             return <Component {...props} />
//         }}
//         />
//     )}
//     </>
//   )
// }


const ProtectedRoute = ({isAuthenticated}) => {
  console.log('isAuthenticated', isAuthenticated)
  if(!isAuthenticated){
    return < Navigate to={"/login"} />
  }
  return <Outlet />;
  
}

export default ProtectedRoute
