import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Badge,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

const awkGroup1 = [49, 10, 52, 83, 84, 85, 86, 87, 88, 89, 90];
const awkGroup2 = [21, 56, 105, 51, 98, 59, 91, 92, 93, 94, 95];
const awkGroup3 = [22, 23, 24, 25, 26, 116, 117, 118, 119, 120];
const awkGroup4 = [28, 54, 55, 11, 12, 13, 68, 69, 70];
const awkGroup5 = [46, 47, 45, 50, 30, 64, 20, 115];
const awkGroup6 = [43, 61, 107, 111, 27, 96, 57, 58, 60, 78, 126, 108, 110];
const awkGroup7 = [73, 74, 75, 76, 77, 121, 122, 123, 124, 125, 82, 62];
const awkGroup8 = [44, 79, 80, 81, 112, 113, 114, 48, 109];
const awkGroup9 = [14, 15, 16, 17, 18, 19, 53, 99, 100, 101, 102, 103, 104];
const awkGroup10 = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 29];
const awkGroup11 = [1, 2, 3, 65, 66, 67, 4, 5, 6, 7, 8, 9, 97];
const awkGroup12 = [106, 63, 127, 128, 129, 130];

const awkGroups = [awkGroup1, awkGroup2, awkGroup3, awkGroup4, awkGroup5, awkGroup6, awkGroup7, awkGroup8, awkGroup9, awkGroup10, awkGroup11, awkGroup12];

// PriorityMap
const priorityMap = awkGroups.flat().reduce((acc, item, index) => {
  acc[item] = index;
  return acc;
}, {});

// Sort func
const sortByAwkGroup = (awkArray) => {
  return awkArray.sort((a, b) => (priorityMap[a] ?? Infinity) - (priorityMap[b] ?? Infinity));
};

const AwokenSelector = ({ setSelectedAwokens }) => {
  const [open, setOpen] = useState(false);
  const [awokenCount, setAwokenCount] = useState({});

  const [darkMode, setDarkMode] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAwokenClick = (awokenId) => {
    setSelectedAwokens((prev) => sortByAwkGroup([...prev, awokenId]));
    setAwokenCount((prev) => ({
      ...prev,
      [awokenId]: (prev[awokenId] || 0) + 1,
    }));
  };

  const handleSelectedAwokenClick = (awkId) => {
    setAwokenCount((prev) => {
      const newCount = (prev[awkId] || 0) - 1;
      if (newCount <= 0) {
        delete prev[awkId];
        return { ...prev };
      }
      return { ...prev, [awkId]: newCount };
    });

    setSelectedAwokens((prev) => {
      const newArray = [...prev];
      const index = newArray.indexOf(Number(awkId));
      if (index !== -1) newArray.splice(index, 1);
      return newArray;
    });
  };

  // togger change darkmode for dialog
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      const firstChildElement = rootElement.firstElementChild;
      if (firstChildElement) {
        const className = firstChildElement.className;
        if (className.includes("DarkMode")) {
          setDarkMode(true);
        } else if (className.includes("LightMode")) {
          setDarkMode(false);
        }
      }
    }
  }, [open]);

  return (
    <div>
      {/* Filter button */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={1}
            style={{
              marginTop: "2px",
              borderRadius: "5px",
              marginLeft: "unset",
            }}
          >
            <Button onClick={handleClickOpen}>
              <FilterAlt />
            </Button>
            {sortByAwkGroup(Object.keys(awokenCount)).map((awokenID) => (
              <Grid item key={awokenID}>
                <Badge
                  badgeContent={
                    awokenCount[awokenID] === 1 ? 0 : awokenCount[awokenID]
                  }
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <img
                    src={`https://pad.protic.site/wp-content/uploads/pad-awks/${awokenID}.png`}
                    alt={`Selected ${awokenID}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectedAwokenClick(awokenID)}
                  />
                </Badge>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {/* Main Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: darkMode ? "#121212" : "white",
            color: darkMode ? "white" : "black",
          },
        }}
      >
        <DialogTitle>Select Awoken</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={1}
                style={{
                  marginTop: "2px",
                  backgroundColor: "darkkhaki",
                  borderRadius: "5px",
                }}
              >
                {sortByAwkGroup(Object.keys(awokenCount)).map((awokenID) => (
                  <Grid item key={awokenID}>
                    <Badge
                      badgeContent={
                        awokenCount[awokenID] === 1 ? 0 : awokenCount[awokenID]
                      }
                      color="error"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <img
                        src={`https://pad.protic.site/wp-content/uploads/pad-awks/${awokenID}.png`}
                        alt={`Selected ${awokenID}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSelectedAwokenClick(awokenID)}
                      />
                    </Badge>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {awkGroups.map((group, groupIndex) => (
                  <Grid container item spacing={1} key={groupIndex}>
                    {group.map((awkId, index) => (
                      <Grid item key={index}>
                        <img
                          src={`https://pad.protic.site/wp-content/uploads/pad-awks/${awkId}.png`}
                          alt={`awk_${index}`}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleAwokenClick(awkId)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AwokenSelector;
