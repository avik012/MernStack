import { Typography } from '@mui/material'
import React from 'react'
import './OrderSuccess.css'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const OrderSuccess = () => { 
  return (
    <div className='orderSuccess'>
        <CheckCircleIcon />

        <Typography> Your Order has been Placed Successfully</Typography>
        <Link to="/order/me" >View Orders </Link>
    </div>
  )
}

export default OrderSuccess;