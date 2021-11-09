import './App.css';
import { Chart } from './components/chart';
import { useState,  } from 'react';
import faker from 'faker';

function App() {
  const [user, setUser] = useState({
    id: faker.datatype.uuid(),
    email: '',
    name: '',
    favorites: []
  });

  const updateUser = (user) => setUser(user);

  return (
      <div className="App">
        <header className="App-header">
          <h1>Billboard Top 100</h1>
        </header>
        <Chart user={user} updateUser={updateUser}></Chart>
      </div>
  );
}

export default App;
