/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  Tooltip,
  List,
  Typography,
  ListItemButton,
} from "@mui/material";
import awokenSkills from "../awoken_skills.json";
import AwokenSelector from "./awkSelector/awkSelector";
import seriesDatas from '../series.json';

/**
 * Format array of awoken, taken from DB, to an array of awoken IDs
 * 
 * (parseAwks: false) "(49),(91),(111)" => ['49','91','46']
 * 
 * (parseAwks: true) "(49),(91),(111)" => ['49','91','61','61'] (111 is 10+ Combo awk = 2 10 combo awk)
 * @param {String} awokenString 
 * @param {Boolean} parseAwks 
 */
const reformatAwokensList = (awokenString, parseAwks) => {
  if (awokenString === '' || awokenString === null) return [];
  const parseAwoken = {
    '52': '10,10',
    '53': '19,19',
    '56': '21,21',
    '68': '11,11,11,11,11',
    '69': '12,12,12,12,12',
    '70': '13,13,13,13,13',
    '96': '27,27',
    '97': '51,51',
    '98': '9,9',
    '99': '14,14',
    '100': '15,15',
    '101': '16,16',
    '102': '17,17',
    '103': '18,18',
    '104': '19,19',
    '107': '43,43',
    '108': '60,60',
    '109': '48,48',
    '110': '78,78',
    '111': '61,61',
    '112': '79,79',
    '113': '80,80',
    '114': '81,81',
    '115': '20,20',
    '116': '22,22,22',
    '117': '23,23,23',
    '118': '24,24,24',
    '119': '25,25,25',
    '120': '26,26,26',
    '121': '73,73',
    '122': '74,74',
    '123': '75,75',
    '124': '76,76',
    '125': '77,77',
  }
  let awokenList = awokenString.replace(/[()]/g, "");
  // parseAwoken
  if (parseAwks) {
    Object.keys(parseAwoken).forEach(awk => {
      awokenList = awokenList.replace(`${awk}`, `${parseAwoken[awk]}`);
    })
  }
  // split
  awokenList = awokenList.split(",");
  return awokenList;
}
/**
 * This function checks if all elements in array A are in array B
 * @param {string[]} A 
 * @param {string[]} B 
 * @returns true if all elements in A are in B, false otherwise
 */
const areAllElementsInArray = (A, B) => {
  const countOccurrences = (arr) => {
    return arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  };

  const countA = countOccurrences(A);
  const countB = countOccurrences(B);

  return Object.keys(countA).every(key => countA[key] <= (countB[key] || 0));
}
// Maximum number of monsters to display
const maximumDisplay = 20;

const MonsterTable = ({ data }) => {
  const allowedSearchTypes = ["ID", "Name", "Active Skill", "Leader Skill", "Collab"]; // Add more search types if needed

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("ID"); // Default search type
  const [onEnterKeyDown, setEnterKeyDown] = useState(false);
  const [onFocus, setFocus] = useState(false);
  const [filteredData, setFilteredData] = useState(data.slice(0, maximumDisplay));

  const [selectedAwokens, setSelectedAwokens] = useState([]);

  const [suggestionCollab, setSuggestionCollab] = useState(seriesDatas);
  const suggestionsRef = useRef(null);

  const handleSuggestionClick = (suggestion) => {
    setSuggestionCollab([suggestion]);
    setSearchTerm(suggestion.name_en);
    setFocus(false);
    setFilteredData(data.filter((item) => item.series_id === suggestion.series_id));
  }

  const handleClickOutsidePaper = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    setSearchTerm("");
    setFilteredData(data.slice(0, maximumDisplay));
  }, [searchType]);
  useEffect(() => {
    // Filter function based on monster_id_jp and name_en
    if (searchTerm !== "") {
      switch (searchType) {
        case "ID":
          setFilteredData(
            data.filter(
              (item) =>
                (item.monster_id_jp ?? item.monster_id_na ?? 0).toString() ===
                searchTerm
            )
          );
          break;
        case "Name":
          if (onEnterKeyDown)
            setFilteredData(
              data.filter((item) =>
                (item.name_en ?? '').toLowerCase().includes(searchTerm)
              )
            );
          break;
        case "Active Skill":
          if (onEnterKeyDown)
            setFilteredData(
              data.filter((item) =>
                (item.active_skill_desc_en ? item.active_skill_desc_en : '').toLowerCase().includes(searchTerm)
              )
            );
          break;
        case "Leader Skill":
          if (onEnterKeyDown)
            setFilteredData(
              data.filter((item) =>
                (item.item.leader_skill_desc_en ? item.item.leader_skill_desc_en : '').toLowerCase().includes(searchTerm)
              )
            );
          break;
        case "Collab":
          // Filter function based on series name
          setSuggestionCollab(
            seriesDatas.filter((item) =>
              item.name_en.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
          break;
        default:
          break;
      }
    }
  }, [searchTerm, onEnterKeyDown, searchType]);
  useEffect(() => {
    // Filter function based on selectedAwokens
    if (selectedAwokens.length > 0) {
      const filteredDatas = [];
      for (let index = 0; index < data.length; index++) {
        if (filteredDatas.length === maximumDisplay) break;
        const parsedData = reformatAwokensList(data[index].awakenings, true);
        const parsedSelectedAwokens = reformatAwokensList(
          selectedAwokens.toString(),
          true
        );
        if (areAllElementsInArray(parsedSelectedAwokens, parsedData)) {
          filteredDatas.push(data[index]);
        }
      }
      setFilteredData(filteredDatas);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAwokens])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsidePaper);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsidePaper);
    };
  }, []);

  return (
    <div>
      {/* Search input */}
      <FormControl
        fullWidth
        variant="outlined"
        style={{
          marginBottom: "20px",
          border: "0.1px solid",
          borderRadius: "5px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          color="primary"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEnterKeyDown(true);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setEnterKeyDown(false);
            }
          }}
          onFocus={() => setFocus(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Search Type" }}
                  style={{ marginRight: "10px" }}
                  variant="standard"
                >
                  {allowedSearchTypes.map((type) => (
                    <MenuItem key={type} value={type} color="primary">
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </InputAdornment>
            ),
          }}
        />
        <AwokenSelector setSelectedAwokens={setSelectedAwokens} />
        {searchType === "Collab" && searchTerm !== "" && onFocus && (
          <Paper
            elevation={3}
            style={{
              position: "absolute",
              zIndex: 1,
              width: "300px",
              top: "100%",
            }}
            ref={suggestionsRef}
          >
            <List>
              {(suggestionCollab.length > maximumDisplay
                ? suggestionCollab.slice(-1 * maximumDisplay)
                : suggestionCollab
              ).map((suggestion) => (
                <ListItemButton
                  key={suggestion.series_id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Typography variant="body1">{suggestion.name_en}</Typography>
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
      </FormControl>

      {/* Table */}
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "inherit",
          color: "inherit",
          borderColor: "inherit",
          border: "0.1px solid",
          borderRadius: "5px",
        }}
      >
        <Table
          style={{
            backgroundColor: "inherit",
            color: "inherit",
            borderColor: "inherit",
          }}
        >
          <TableHead>
            <TableRow style={{ whiteSpace: "nowrap" }}>
              <TableCell
                variant="head"
                style={{
                  backgroundColor: "inherit",
                  color: "inherit",
                  borderColor: "inherit",
                }}
              >
                ID (JP)
              </TableCell>
              <TableCell
                variant="head"
                style={{
                  backgroundColor: "inherit",
                  color: "inherit",
                  borderColor: "inherit",
                }}
              >
                Name (EN)
              </TableCell>
              <TableCell
                variant="head"
                style={{
                  backgroundColor: "inherit",
                  color: "inherit",
                  borderColor: "inherit",
                }}
              >
                HP / ATK / RCV
              </TableCell>
              <TableCell
                variant="head"
                style={{
                  backgroundColor: "inherit",
                  color: "inherit",
                  borderColor: "inherit",
                }}
              >
                Active Skill
              </TableCell>
              <TableCell
                variant="head"
                style={{
                  backgroundColor: "inherit",
                  color: "inherit",
                  borderColor: "inherit",
                }}
              >
                CD
              </TableCell>
              <TableCell
                variant="head"
                style={{
                  backgroundColor: "inherit",
                  color: "inherit",
                  borderColor: "inherit",
                }}
              >
                Leader Skill
              </TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow key={row.monster_id_jp ?? row.monster_id_na}>
                  <TableCell
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                    }}
                  >
                    {row.monster_id_jp ?? row.monster_id_na}
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                    }}
                  >
                    {row.name_en}
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "nowrap",
                      backgroundColor: "inherit",
                      color: "inherit",
                    }}
                  >{`${row.hp_max} / ${row.atk_max} / ${row.rcv_max}`}</TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                    }}
                  >
                    {row.active_skill_desc_en}
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "nowrap",
                      backgroundColor: "inherit",
                      color: "inherit",
                    }}
                  >{`${row.turn_min} - ${row.turn_max}`}</TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                    }}
                  >
                    {row.leader_skill_desc_en}
                  </TableCell>
                </TableRow>
                <TableRow>
                  {/* empty  */}
                  <TableCell
                    colSpan={1}
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                      borderColor: "inherit",
                    }}
                  />
                  {/* attribute */}
                  <TableCell
                    colSpan={1}
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                      borderColor: "inherit",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {[
                      row.attribute_1_id,
                      row.attribute_2_id,
                      row.attribute_3_id,
                    ].map((element, index) =>
                      element === null || element.toString() === "6" ? (
                        <img
                          key={index}
                          src={`./NULL.png`}
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
                      )
                    )}
                  </TableCell>
                  {/* awoken */}
                  <TableCell
                    colSpan={2}
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                      borderColor: "inherit",
                    }}
                  >
                    {reformatAwokensList(row.awakenings, false).map(
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
                  </TableCell>
                  {/* super awoken */}
                  <TableCell
                    colSpan={2}
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                      borderColor: "inherit",
                    }}
                  >
                    {row.super_awakenings.length !== 0 ? (
                      row.super_awakenings
                        .replace(/[()]/g, "")
                        .split(",")
                        .map((element, index) => (
                          <Tooltip
                            key={index}
                            title={
                              awokenSkills.find(
                                (awkSkill) =>
                                  awkSkill.awoken_skill_id.toString() ===
                                  element
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
                        ))
                    ) : (
                      <></>
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MonsterTable;
