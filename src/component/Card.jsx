import React, {useEffect, useState} from 'react';
import Categories from "./Categories";

const Card = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState("");

    const filteredCountries = items.filter((item => {
        return item.artistName.toLowerCase().includes(value.toLowerCase())
    }));

    function TimeTrackMinutes(ms) {
        const s = ms / 1000;
         // Оставляем только целую часть
        return Math.floor(s / 60);
    }

    function TimeTrackSecond(ms) {
        const s = ms / 1000;
         // Оставляем только целую часть
        return Math.floor(s % 60);
    }

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        fetch("data.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.filter((item) => item.wrapperType === 'track'));
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {

        console.log(filteredCountries)
        return (
            <div className='blogs'>
                <input
                    type="search"
                    placeholder="Artist..."
                    onChange={(event) => setValue(event.target.value)}
                />
                <Categories/>
                {filteredCountries.map((item, index) => (
                    <article className='article1' key={index}>
                        <img className='img' src={item.artworkUrl100} alt='error'/>
                        <p className='p1'>{item.artistName}</p>
                        <p className='p2'>{item.trackName}</p>
                        <p className='p3'>{item.collectionName}</p>
                        <p className='p4'>{item.primaryGenreName}</p>
                        <div className='information'>
                            <h1><a href={item.trackViewUrl}>{item.artistName} - {item.trackName}</a> <img src='7990.png_300.png'/></h1>
                            <p><b>Сollection: </b>{item.collectionName}</p>
                            <p><b>Track Count: </b>{item.trackCount}</p>
                            <p><b>Price: </b>{item.collectionPrice} USD</p>
                            <p className='p5'><b>Track duration: </b>{TimeTrackMinutes(item.trackTimeMillis)}:{TimeTrackSecond(item.trackTimeMillis)} min</p>
                            <p className='p6'><b>Track Price: </b>{item.trackPrice} USD</p>
                        </div>
                    </article>
                ))}</div>
        );
    }
}

export default Card;