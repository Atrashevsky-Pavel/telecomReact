import React from 'react';
import  classes from './MyInput.module.css'

const MyInput = (props) => {
    return (
        <input placeholder="Введите текст" className={classes.myInput} {...props}/>
    );
};

export default MyInput;