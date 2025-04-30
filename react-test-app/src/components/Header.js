import React, { useEffect } from "react";
const Header = () => {
  const [showHeaderBody, setShowHeaderBody] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <header>
      <h1>Sample App Header</h1>
      <button
        onClick={() => {
          setShowHeaderBody(!showHeaderBody);
        }}
      >
        {showHeaderBody ? "Hide Header Body" : "Show Header Body"}
      </button>
      {showHeaderBody && (
        <div style={{ backgroundColor: "lightblue", padding: "10px" }}>
          <p>This is the header body.</p>
          <p>It contains additional information.</p>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
export default Header;
