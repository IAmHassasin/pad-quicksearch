import './App.css';
import MonsterTable from './table/monsterTable';
import monsterDatas from './data.json';
import { useState } from 'react';
import Header from './header/headerToggle';

const App = () => {
  const [mode, setMode] = useState(false); // Mặc định dark mode là true

  const changeColorMode = () => {
    setMode(!mode);
  };

  return (
    <div className={`App ${mode ? 'DarkMode' : 'LightMode'}`}>
      <Header darkMode={mode} callbackChangeMode={changeColorMode} />
      <MonsterTable data={monsterDatas.slice().reverse()} />
    </div>
  );
};

export default App;
