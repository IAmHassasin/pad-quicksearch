import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import awokenSkills from "../awoken_skills.json";

const MonsterTable = ({ data }) => {
  const allowedSearchTypes = ["ID", "Name", "Active Skill", "Leader Skill"]; // Add more search types if needed

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("ID"); // Default search type
  const [onEnterKeyDown, setEnterKeyDown] = useState(false);
  const [filteredData, setFilteredData] = useState(data.slice(0, 20));

  useEffect(() => {
    setSearchTerm("");
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
                item.name_en.toLowerCase().includes(searchTerm)
              )
            );
          break;
        case "Active Skill":
          if (onEnterKeyDown)
            setFilteredData(
              data.filter((item) =>
                item.active_skill_desc_en.toLowerCase().includes(searchTerm)
              )
            );
          break;
        case "Leader Skill":
          if (onEnterKeyDown)
            setFilteredData(
              data.filter((item) =>
                item.leader_skill_desc_en.toLowerCase().includes(searchTerm)
              )
            );
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, onEnterKeyDown, searchType]);

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
              <React.Fragment
                key={row.id}
                style={{
                  backgroundColor: "inherit",
                  color: "inherit",
                  borderColor: "inherit",
                }}
              >
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
                  <TableCell
                    colSpan={1}
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                      borderColor: "inherit",
                    }}
                  />
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
                      (element === null || element === 6) ? (
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
                  <TableCell
                    colSpan={4}
                    style={{
                      backgroundColor: "inherit",
                      color: "inherit",
                      borderColor: "inherit",
                    }}
                  >
                    {row.awakenings
                      .replace(/[()]/g, "")
                      .split(",")
                      .map((element, index) => (
                        <Tooltip
                          key={index}
                          title={
                            awokenSkills.find(
                              (awkSkill) =>
                                awkSkill.awoken_skill_id.toString() === element
                            )?.desc_en ?? 'Unknown'
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
                      ))}
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
