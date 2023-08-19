import { useState, useEffect } from 'react';

export default function List({ selectUser }) {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
  
    useEffect(() => {
      setError(false);
      setLoading(true);
      fetch(`${process.env.REACT_APP_DATA_URL}users.json`)
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
        });
    }, []);
  
    return (
      <ul className="list">
        {isError && <li className="list-item">Ошибка загрузки</li>}
        {isLoading && <li className="list-item">Loading...</li>}
        {users.map((item) => {
          return <li key={item.id} className="list-item" onClick={selectUser(item)}>{item.name}</li>
        })}
      </ul>
    );
}