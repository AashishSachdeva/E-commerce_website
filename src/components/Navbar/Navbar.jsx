import React from 'react'
import {AppBar,Toolbar,IconButton,Badge/*,MenuItem ,Menu*/,Typography} from '@material-ui/core';

import {ShoppingCart} from '@material-ui/icons';
import logo from '../../Assets/Commerce.png';
import useStyles from './styles';
import {Link,useLocation} from 'react-router-dom';
const Navbar = ({totalItems}) => {
    const classes=useStyles();
    const location =useLocation();
   
    return (
        
           <AppBar position="fixed" className={classes.appBar} color="inherit">
               <Toolbar>
                   <Typography component ={Link} to="/"  >
                       <img src={logo} alt="Commerce.js" height="25px className={classe.image}"/>
                       Commerce.js
                   </Typography>
                   <div className={classes.grow}/>
                   {location.pathname ==='/' && (
                   <div className={classes.button}>
                        <Link to="/Cart">Go to Cart</Link>
                        <IconButton component ={Link} to="/Cart" aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                   </div>)}

               </Toolbar>
            </AppBar> 
       
    )
}

export default Navbar
