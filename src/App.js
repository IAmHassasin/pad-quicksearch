import './App.css';
import MonsterTable from './table/monsterTable';
import monsterDatas from './data.json';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'PDQ - P&D Quicksearch';
  }, []);
  return (
    <div className="App">
      <MonsterTable data={monsterDatas}/>
    </div>
  );
}

export default App;
