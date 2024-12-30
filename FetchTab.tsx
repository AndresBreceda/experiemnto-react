import { useState, useEffect } from "react";

const URL_API_USERS = "https://jsonplaceholder.typicode.com/users";
const URL_API_DOGS = "https://api.thedogapi.com/v1/breeds";

function ExperimentTab() {
  const [users, setUsers] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersResponse = await fetch(URL_API_USERS);
        const usersData = await usersResponse.json();
        const dogsResponse = await fetch(URL_API_DOGS);
        const dogsData = await dogsResponse.json();

        const limitedDogs = dogsData.slice(0, usersData.length);

        setUsers(usersData);
        setDogs(limitedDogs);
        setFilteredUsers(usersData); // Inicialmente todos los usuarios
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submit
  function handleSubmit(event) {
    event.preventDefault(); // Evita recargar la página
    const searchResult = users.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredUsers(searchResult);
  }

  return (
    <div className="App">
      <h1>Users and Their Dogs</h1>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul>
          {filteredUsers.map((user, index) => (
            <li key={user.id}>
              <p>
                <strong>{user.name}</strong> ({user.email})
              </p>
              {dogs[index] && (
                <div>
                  <img
                    src={dogs[index].image?.url}
                    alt={dogs[index].name}
                    width="100"
                  />
                  <p>Dog: {dogs[index].name}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Busca el dueño"
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default ExperimentTab;
