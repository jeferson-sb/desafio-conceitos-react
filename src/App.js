import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  });

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: 'https://github.com/facebook/react',
      title: 'React',
      techs: ['React', 'JavaScript'],
    });

    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const remainingRepos = repositories.filter((repo) => repo.id === id);
    setRepositories(remainingRepos);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
