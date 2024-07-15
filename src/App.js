import './App.css';
import MonsterTable from './table/monsterTable';
import monsterDatas from './data.json';
import { useState } from 'react';
import Header from './header/headerToggle';
import PasswordDialog from './login/PasswordDialog';
import DonationButton from './donationButton/donationButton';
import Footer from './footer/footer';

const mergedData = (data) => {
  const dataTemp = data.slice();
  dataTemp.forEach((monster1, index1) => {
    if (monster1.monster_id_jp === null && monster1.monster_id_na !== null) {
      dataTemp.forEach((monster2, index2) => {
        if (
          monster2.monster_id_jp === monster1.monster_id_na &&
          monster2.monster_id_na === null
        ) {
          const monsterTemp = monster1;
          monsterTemp.monster_id_jp = monster2.monster_id_jp;
          monsterTemp.collab_en = monster2.collab_en;
          monsterTemp.series_id = monster2.series_id;
          dataTemp[index1] = monsterTemp;
          dataTemp.slice(index2, 1);
        }
      });
    }
  });
  return dataTemp;
};

const App = () => {
  const [mode, setMode] = useState(false); // Dark mode = true

  const [passwordCheck, setPasswordCheck] = useState(false);

  const passwordRequired = false;

  const changeColorMode = () => {
    setMode(!mode);
  };

  const checkPassword = () => {
    setPasswordCheck(true);
  }

  return (
    <>
      <div className={`App ${mode ? "DarkMode" : "LightMode"}`}>
        <Header darkMode={mode} callbackChangeMode={changeColorMode} />
        <MonsterTable data={mergedData(monsterDatas).slice().reverse()} />
        <DonationButton />
        <Footer />
      </div>
      {/* <PasswordDialog callbackCheckPassword={checkPassword}></PasswordDialog>
      {passwordCheck && passwordRequired ? (
        <div className={`App ${mode ? "DarkMode" : "LightMode"}`}>
          <Header darkMode={mode} callbackChangeMode={changeColorMode} />
          <MonsterTable data={mergedData(monsterDatas).slice().reverse()} />
        </div>
      ) : (
        <div></div>
      )} */}
    </>
  );
};

export default App;
