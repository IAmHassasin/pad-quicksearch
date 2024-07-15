import React from 'react';
import { IconButton, AppBar, Toolbar } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import CompareDialog from '../table/compareMonster';

const Header = ({ darkMode, callbackChangeMode }) => {
  const handleColorMode = () => {
    callbackChangeMode();
  };
  const sampleCompareDialogDatas = [
    {
      "monster_id_jp": 11189,
      "monster_id_na": null,
      "hp_max": 8214,
      "atk_max": 3874,
      "rcv_max": 628,
      "rarity": 8,
      "group_id": 217,
      "collab_id": 107,
      "awakenings": "(52),(104),(104),(104),(111),(111),(109),(129)",
      "super_awakenings": "",
      "attribute_1_id": 4,
      "attribute_2_id": 0,
      "attribute_3_id": null,
      "name_en": "Devil Gundam Final Form",
      "active_skill_desc_en": "For 2 turns, 3x RCV; For 2 turns, set damage cap of self to 10,000,000,000; Reduce unable to match orbs effect by 9,999 turns; Remove all binds and awoken skill binds",
      "turn_min": 6,
      "turn_max": 6,
      "active_skill_tags": "(21),(41),(215),(220),(281)",
      "leader_skill_desc_en": "10x ATK and increase combo by 5 when matching 6 or more connected Fire and Dark orbs at once; 5x HP & ATK for Machine type",
      "leader_skill_tags": "(28),(211)",
      "collab_en": "Gundam Collab",
      "series_id": 287
    },
    {
      "monster_id_jp": 11187,
      "monster_id_na": null,
      "hp_max": 8025,
      "atk_max": 2587,
      "rcv_max": 14,
      "rarity": 9,
      "group_id": 217,
      "collab_id": 107,
      "awakenings": "(52),(56),(56),(28),(46),(46),(109),(109),(63)",
      "super_awakenings": "(56),(106),(61)",
      "attribute_1_id": 0,
      "attribute_2_id": 4,
      "attribute_3_id": null,
      "name_en": "Neo Zeong",
      "active_skill_desc_en": "For 1 turn, 3x ATK for all monsters; For 1 turn, the board becomes 7x6; Delay enemies' next attack by 1 turn; Enhance all orbs",
      "turn_min": 6,
      "turn_max": 36,
      "active_skill_tags": "(2),(9)",
      "leader_skill_desc_en": "12x ATK and reduce damage taken by 35% when matching Fire and Dark; Increase combo by 4 when matching Fire and Dark; 3x all stats for Machine type",
      "leader_skill_tags": "(31),(32),(211)",
      "collab_en": "Gundam Collab",
      "series_id": 287
    },{
      "monster_id_jp": 11185,
      "monster_id_na": null,
      "hp_max": 6007,
      "atk_max": 4472,
      "rcv_max": 22,
      "rarity": 8,
      "group_id": 217,
      "collab_id": 107,
      "awakenings": "(52),(56),(28),(53),(59),(112),(112),(112),(63)",
      "super_awakenings": "(56),(106),(113)",
      "attribute_1_id": 1,
      "attribute_2_id": 2,
      "attribute_3_id": null,
      "name_en": "00 Riser",
      "active_skill_desc_en": "For 30 turns, 2x ATK for this monster; For 30 turns, this monster's damage cap becomes 6,000,000,000; Becomes Team leader; changes back when used again",
      "turn_min": 4,
      "turn_max": 4,
      "active_skill_tags": "(22)",
      "leader_skill_desc_en": "40x ATK and reduce damage taken by 77% when matching 3 or more colors; Increase combo by 4 when matching 3 or more colors; 3x RCV for Machine type",
      "leader_skill_tags": "(30),(32),(211)",
      "collab_en": "Gundam Collab",
      "series_id": 287
    },
  ]

  return (
    <AppBar position="static" color='transparent' style={{ boxShadow: 'none' }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}></div>
        <CompareDialog selectedMonsterIds={sampleCompareDialogDatas}/>
        <IconButton color="inherit" onClick={handleColorMode}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
