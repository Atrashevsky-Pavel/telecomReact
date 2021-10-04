import React from 'react';
import Item from "./Item/Item";
import classes from "./Items.module.css"

const Items = ({items}) => {

    return (
       <table className={classes.main__table}>
           <thead>
               <tr>
                   <td>Номер</td>
                   <td>Заголовок</td>
                   <td>Порода</td>
                   <td>Картинка</td>
               </tr>
           </thead>
           <tbody>
           {items.map((item, idx) => (
               <Item item = {item} idx = {idx + 1} key = {item.title}/>
           ))}
           </tbody>
       </table>
    );
};

export default Items;