import { useState, useEffect } from 'react';

export default function Details({ info }) {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (info) {
      setError(false);
      setLoading(true);
      fetch(`${process.env.REACT_APP_DATA_URL}${info.id}.json`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
        });
    }
  }, [info]);

  return (
    <div className="Details">
      {isError && <p>Ошибка загрузки</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && user && (
        <div className="details">
          <div className="details-img"><img src={`${user.avatar}?${Math.random()}`} alt={user.name} /></div>
          <div className='description'>
            <h2><div className="details-name">{user.name}</div></h2>
            <div className="details-city">City: {user.details.city}</div>
            <div className="details-company">Company: {user.details.company}</div>
            <div className="details-position">Position: {user.details.position}</div>
          </div>
        </div>
      )}
    </div>
  );
}