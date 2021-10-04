import React, { useState, useEffect } from 'react';
import './App.css';
import MyButton from "./Components/UI/button/MyButton";
import MyInput from "./Components/UI/input/MyInput";
import MySelect from "./Components/UI/select/MySelect";
import ApiService from "./Components/Services/apiService";
import Items from "./Components/Items/Items";


function App() {
  const [errorMain, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [items, setItems] = useState([]);
  const [breeds, setBreeds] = useState([]);

  const [valuesFilter,  setValuesFilter] = useState({breed: '', search: ''})
  const [valueSort, setValueSort] = useState('');

  const callItems = async () => {
    try {
      const result = await ApiService.getAll();
      setItems([]);
      setItems( result);
      const breedsWithoutRepeat = [...new Set(result.map(item => item.breed.title))];
      setBreeds(breedsWithoutRepeat.map(item => { return {title: item, id: result.find(value => value.breed.title === item).breed._id}}));
      setIsLoaded(true);
    } catch (e) {
      setIsLoaded(true);
      setError(e);
    }

  }

  async function callFilter () {
    try {
      setIsLoaded(false);
      const result = await ApiService.postFilter(valuesFilter);
      setItems([]);
      setItems(result);
      setIsLoaded(true);
    } catch (e) {
      setIsLoaded(true);
      setError(e);
    }
  }

  useEffect(() => {
    callItems();
  }, []);

  useEffect(() => {
    if ( valuesFilter.breed || valuesFilter.search)  {
      callFilter()
    }
  }, [valuesFilter]);

  const sort = (breed) => {
    setValuesFilter({...valuesFilter, breed});
  }
  const search = () => {
    setValuesFilter({...valuesFilter, search: valueSort});
  }

  if (errorMain) {
    return (
        <div>
          Ошибка:
        </div>
    );
  } if (!isLoaded) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="main">
        <div className="main__sort">
          <div>
            <MyInput
                value = {valueSort}
                onChange={e=>setValueSort(e.target.value)}
            />
            <MyButton onClick = {search}>Поиск</MyButton>
          </div>
          <div>
            <MySelect onChange = {sort} breeds = {breeds}/>
          </div>
        </div>
        <Items items={items}/>
    </div>
  );
}

export default App;
