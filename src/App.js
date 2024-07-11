import './App.css';
import MonsterTable from './table/monsterTable';
import monsterDatas from './data.json';
import { useState } from 'react';
import Header from './header/headerToggle';
import PasswordDialog from './login/PasswordDialog';

const App = () => {
  const [mode, setMode] = useState(false); // Mặc định dark mode là true

  const [passwordCheck, setPasswordCheck] = useState(false);

  // number[] | boolean
  const [compareCard, setCompareCard] = useState(false);

  const changeColorMode = () => {
    setMode(!mode);
  };

  const checkPassword = () => {
    setPasswordCheck(true);
  }

  const popupCompareDialog = () => {
    compareCard ? setCompareCard(false) : setCompareCard(true);
  }

  return (
    <>
      <PasswordDialog callbackCheckPassword={checkPassword}></PasswordDialog>
      {passwordCheck ? (
        <div className={`App ${mode ? "DarkMode" : "LightMode"}`}>
          <Header
            darkMode={mode}
            callbackChangeMode={changeColorMode}
            callbackComparePopup={popupCompareDialog}
          />
          <MonsterTable data={monsterDatas.slice().reverse()} />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default App;
