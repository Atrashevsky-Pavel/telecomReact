import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [errorMain, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [items, setItems] = useState([]);
  const [breeds, setBreeds] = useState([]);

  const [valueSearch, setValueSearch] = useState('');
  let valueSort = 'Не выбрано';

  const call = (first = false) => {
    const url = 'http://localhost:3200/';
    let urlAditional = '';
    const sortUrl = 'breed=';
    const searchUrl = 'q=';
    const question = '?';
    const coniuction = '&';

    if (valueSort === 'Не выбрано' && valueSearch) {
      urlAditional = question + searchUrl + valueSearch;
    }
    if (valueSort !== 'Не выбрано' && !valueSearch) {
      urlAditional = question + sortUrl + valueSort;
    }
    if (valueSort !== 'Не выбрано' && valueSearch) {
      urlAditional = question + sortUrl + valueSort + coniuction + searchUrl + valueSearch;
    }

    fetch(url + urlAditional)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          if (first) {
            const arr = [];
            result.forEach((item) => arr.push(item.breed.title));
            setBreeds(arr);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  };

  useEffect(() => {
    call(true);
  }, []);

  function sort(event) {
    valueSort = event.target.value;
    call();
  }
  const search = () => {
    if (valueSearch) {
      call();
    }
  };

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
          <input type="text" placeholder="Введите текст" value={valueSearch} onChange={(event) => setValueSearch(event.target.value)} />
          <button type="button" onClick={search}>Поиск</button>
        </div>
        <div>
          <select onChange={sort}>
            <option>Не выбрано</option>
            {breeds.map((item) => (
              <option>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Заголовок</td>
            <td>Порода</td>
            <td>Картинка</td>
          </tr>
          {items.map((item) => (
            <tr>
              <td>{item.title}</td>
              <td>{item.breed.title}</td>
              <td>
                <img alt={item.title} src={item.image} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
