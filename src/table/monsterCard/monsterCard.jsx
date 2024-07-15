import { Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { reformatAwokensList } from "../monsterTable";
import awokenSkills from "../../awoken_skills.json";

const monsterExampleData = {
  monster_id_jp: 11185,
  monster_id_na: null,
  hp_max: 6007,
  atk_max: 4472,
  rcv_max: 22,
  rarity: 8,
  group_id: 217,
  collab_id: 107,
  awakenings: "(52),(56),(28),(53),(59),(112),(112),(112),(63)",
  super_awakenings: "(56),(106),(113)",
  attribute_1_id: 1,
  attribute_2_id: 2,
  attribute_3_id: null,
  name_en: "00 Riser",
  active_skill_desc_en:
    "For 30 turns, 2x ATK for this monster; For 30 turns, this monster's damage cap becomes 6,000,000,000; Becomes Team leader; changes back when used again",
  turn_min: 4,
  turn_max: 4,
  active_skill_tags: "(22)",
  leader_skill_desc_en:
    "40x ATK and reduce damage taken by 77% when matching 3 or more colors; Increase combo by 4 when matching 3 or more colors; 3x RCV for Machine type",
  leader_skill_tags: "(30),(32),(211)",
  collab_en: "Gundam Collab",
  series_id: 287,
};

const MonsterCard = ({ monster, selectedAwoken }) => {
  return (
    <Grid item container xs style={{ margin: "5px 0" }}>
      <div style={{ height: "100%", backgroundColor: "#f0f0f0" }}>
        {/* ID and Name */}
        <Grid item xs={1} display={"flex"}>
          <Typography
            alignContent={"center"}
            style={{
              fontWeight: "bold",
              fontSize: "large",
              margin: "0 25px 0 10px",
            }}
          >
            {monsterExampleData.monster_id_jp ??
              monsterExampleData.monster_id_na}
          </Typography>
          <Typography
            alignContent={"center"}
            noWrap={true}
            overflow={"unset"}
            style={{ fontSize: "medium" }}
          >
            {monsterExampleData.name_en}
          </Typography>
        </Grid>
        {/* Awokens */}
        <Grid item xs={1} direction={"row"} display={"flex"}>
          {reformatAwokensList(monsterExampleData.awakenings, false).map(
            (element, index) => (
              <Tooltip
                key={index}
                title={
                  awokenSkills.find(
                    (awkSkill) =>
                      awkSkill.awoken_skill_id.toString() === element
                  )?.desc_en ?? "Unknown"
                }
                placement="top"
              >
                <img
                  key={index}
                  src={`https://pad.protic.site/wp-content/uploads/pad-awks/${element.trim()}.png`}
                  alt={`awk_${element}`}
                  style={{ marginRight: "10px" }}
                />
              </Tooltip>
            )
          )}
        </Grid>
        {/* Super Awokens */}
        <Grid item direction={"row"} justifyContent={"right"} display={"flex"}>
          {reformatAwokensList(monsterExampleData.super_awakenings, false).map(
            (element, index) => (
              <Tooltip
                key={index}
                title={
                  awokenSkills.find(
                    (awkSkill) =>
                      awkSkill.awoken_skill_id.toString() === element
                  )?.desc_en ?? "Unknown"
                }
                placement="top"
              >
                <img
                  key={index}
                  src={`https://pad.protic.site/wp-content/uploads/pad-awks/${element.trim()}.png`}
                  alt={`awk_${element}`}
                  style={{ marginRight: "10px" }}
                />
              </Tooltip>
            )
          )}
        </Grid>
        {/* Stats */}
        {/* HP */}
        <Grid item direction={"row"} display={"flex"}>
          <Typography style={{ margin: "0 10px" }}>
            HP: {monsterExampleData.hp_max}
          </Typography>
        </Grid>
        {/* ATK */}
        <Grid item direction={"column"} display={"flex"}>
          {[
            monsterExampleData.attribute_1_id,
            monsterExampleData.attribute_2_id,
            monsterExampleData.attribute_3_id,
          ].map((element, index) => {
            return (
                <div style={{
                    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
                }}>
                    {element === null || element.toString() === "6" ? (
                <img
                    key={index}
                    // src={`./NULL.png`}
                    src={`./pad-quicksearch/NULL.png`}
                    alt={`awk_${element}`}
                    style={{
                    width: "31px",
                    height: "32px",
                    marginRight: "10px",
                    }}
                />
                ) : (
                <img
                    key={index}
                    src={`https://pad.protic.site/wp-content/uploads/pad-orbs/${
                    element + 1
                    }.png`}
                    alt={`awk_${element}`}
                    style={{
                    width: "31px",
                    height: "32px",
                    marginRight: "10px",
                    }}
                />
                )}
                <span>10,000</span>
                </div>
            )
            }
          )}
        </Grid>
        {/* RCV */}
        <Grid item direction={"row"} display={"flex"}>
          <Typography style={{ margin: "0 10px" }}>
            RCV: {monsterExampleData.rcv_max}
          </Typography>
        </Grid>
        {/* Active Skill */}
        <Grid item direction={"row"} display={"flex"}>
          <Typography>
            {'Empty handler for active skill'}
          </Typography>
        </Grid>
        {/* Leader Skill */}
        <Grid item direction={"row"} display={"flex"}>
          <Typography>
            {'Empty handler for leader skill'}
          </Typography>
        </Grid>
      </div>
    </Grid>
  );
};

export default MonsterCard;
