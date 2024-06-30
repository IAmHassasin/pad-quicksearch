import './App.css';
import MonsterTable from './table/monsterTable';
import monsterDatas from './data.json';

function App() {
  return (
    <div className="App">
      <MonsterTable data={monsterDatas}/>
    </div>
  );
}

export default App;
