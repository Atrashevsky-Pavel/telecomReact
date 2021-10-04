import React from 'react';

const Item = ({item, idx}) => {
    return (

            <tr>
                <td>{idx}</td>
                <td>{item.title}</td>
                <td>{item.breed.title}</td>
                <td>
                    <img alt={item.title} src={item.image} />
                </td>
            </tr>
    );
};

export default Item;