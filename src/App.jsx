import React, { useState, useEffect, useCallback } from 'react';
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
  const [startIndex, setStartIndex] = useState(0)
  const [page, setPage] = useState({
    current: 0,
    total: 0
  });
  const step = 7;

  const [valuesFilter,  setValuesFilter] = useState({breed: '', search: ''});

  const fetchData = useCallback(async () => {
    setIsLoaded(false)
    try {
      const response = await ApiService.postFilter(valuesFilter)
      setItems(response)
      if (!breeds.length) {
        const breedsWithoutRepeat = [...new Set(response.map(item => item.breed.title))];
        setBreeds(breedsWithoutRepeat.map(item => { return {title: item, id: response.find(value => value.breed.title === item).breed._id}}));
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoaded(true)
    }
  }, [valuesFilter, breeds.length])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    setPage({
      current: 1,
      total: Math.ceil(items.length / step) || 1
    })
  }, [items])

  const sort = (breed) => setValuesFilter({...valuesFilter, breed})

  const search = (event) => setValuesFilter({...valuesFilter, search: event.target.value})

  if (errorMain) return <div> Ошибка: {errorMain}</div>

  const prevHandler = () => {
    if (startIndex > step) {
      setStartIndex(prev => prev - step)
      setPage(prev => ({
        ...page,
        current: prev.current - 1,
      }))
    } else {
      setStartIndex(0)
      setPage({
        ...page,
        current: 1,
      })
    }
  }
  const nextHandler = () => {
    if (startIndex < items.length - step) {
      setStartIndex(prev => prev + step)
      setPage(prev => ({
        ...page,
        current: prev.current + 1,
      }))
    }
  }

  return (
      <div className="main">
        {!isLoaded && <div>Загрузка...</div>}
        <div className="main__sort">
          <div>
            <MyInput
                onChange={search}
            />
          </div>
          <div>
            <MySelect onChange = {sort} breeds = {breeds}/>
          </div>
        </div>
        <Items items={items.slice(startIndex, startIndex + step)} startIndex={startIndex}/>
          <div>{page.current} / {page.total}</div>
          <MyButton onClick = {prevHandler}>prev</MyButton>
          <MyButton onClick = {nextHandler}>next</MyButton>
      </div>
  );
}

export default App;
