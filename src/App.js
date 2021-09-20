import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [items, setItems] = useState([]);
    const [breeds, setBreeds] = useState([]);

    const [valueSearch, setValueSearch] = useState('');

    function  call (sort = '', search = '') {
        const url = "http://localhost:3200/";
        let sortUrl = '?breed=';
        let searchUrl = '&q=';
        if (sort === 'Не выбрано' || !sort) {
            sortUrl = '';
        } else  {
           sortUrl += sort
        }

        if (valueSearch) {
            searchUrl += valueSearch;
        } else {
            searchUrl = ''
        }

        fetch(url + sortUrl + searchUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    const arr = []
                    result.forEach(item => arr.push(item.breed.title));
                    setBreeds(arr);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        call();
    }, [])

    function search() {
        console.log(valueSearch);
    }
    function sort (event) {
        const valueSort = event.target.value;
        call(valueSort, valueSearch)
    }



    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className="main">
                <p>{valueSearch}</p>
                <div className="main__sort">
                    <div>
                        <input type="text"
                               placeholder="Введите текст"
                               value={valueSearch}
                               onChange={event => setValueSearch(event.target.value)}
                        ></input>
                        <button onClick={search}>Поиск</button>
                    </div>
                    <div>
                        <select onChange={sort}>
                            <option>Не выбрано</option>
                            {breeds.map((item, idx) => (
                                <option key={idx}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>Заголовок</td>
                            <td>Картинка</td>
                            <td>Порода</td>
                        </tr>
                        {items.map((item, idx) => (
                            <tr key={idx}>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    {item.breed.title}
                                </td>
                                <td>
                                    <img alt={item.title} src={item.image}></img>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
