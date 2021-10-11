import React from 'react';

const MySelect = ({breeds, onChange}) => {
    return (
          <select  onChange={event => onChange(event.target.value)}>
              <option value={''}>Не выбрано</option>
              {breeds.map((breed) => (
                  <option key={breed.id} value={breed.title}>{breed.title}</option>
              ))}
          </select>
    );
};

export default MySelect;