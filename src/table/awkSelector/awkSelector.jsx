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

const AwokenSelector = ({ setSelectedAwokens }) => {
  const [open, setOpen] = useState(false);
  const [awokenCount, setAwokenCount] = useState({});

  const [darkMode, setDarkMode] = useState(false);

  const awokenTotal = 130;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAwokenClick = (awokenId) => {
    setSelectedAwokens((prev) => [...prev, awokenId]);
    setAwokenCount((prev) => ({
      ...prev,
      [awokenId]: (prev[awokenId] || 0) + 1,
    }));
  };

  const handleSelectedAwokenClick = (image) => {
    setAwokenCount((prev) => {
      const newCount = (prev[image] || 0) - 1;
      if (newCount <= 0) {
        delete prev[image];
        return { ...prev };
      }
      return { ...prev, [image]: newCount };
    });

    setSelectedAwokens((prev) => {
      const newArray = [...prev];
      const index = newArray.indexOf(image);
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
            {Object.keys(awokenCount).map((awokenID) => (
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
      <Dialog open={open} onClose={handleClose} PaperProps={{
        sx: {
            backgroundColor: darkMode ? '#121212' : 'white',
            color: darkMode ? 'white' : 'black',
        }
      }}>
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
                {Object.keys(awokenCount).map((awokenID) => (
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
                {[...Array(awokenTotal).keys()].map((index) => (
                  <Grid item key={index}>
                    <img
                      // need + 1 cause keys start from 0
                      src={`https://pad.protic.site/wp-content/uploads/pad-awks/${
                        index + 1
                      }.png`}
                      alt={`awk_${index}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleAwokenClick(index + 1)}
                    />
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
