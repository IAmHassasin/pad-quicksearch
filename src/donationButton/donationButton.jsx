import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import { VolunteerActivism } from "@mui/icons-material";
import { Button, Dialog } from "@mui/material";

const DonationButton = () => {
  const [popupDialogVisible, setPopupDialogVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const handleToggle = () => {
    setPopupDialogVisible(!popupDialogVisible);
  };

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
  }, [popupDialogVisible]);

  return (
    <div>
      <Fab
        color="primary"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        onClick={() => handleToggle()}
      >
        <VolunteerActivism />
      </Fab>
      <Dialog open={popupDialogVisible} onClose={handleToggle}>
        <div
          style={{
            padding: "20px",
            backgroundColor: darkMode ? "#121212" : "white",
            color: darkMode ? "white" : "black",
          }}
        >
          <h1
            style={{
              textAlign: "center",
            }}
          >
            Thank you for considering donating to P&D Quicksearch!
          </h1>
          <p>
            This site is run by a single developer. <br/> Most of the data on this
            site is sourced from the Tsubaki bot. If you like this site, please
            consider supporting the Tsubaki bot. Your enjoyment of this site is
            thanks enough for the hard work I've put into it.
          </p>
          <p>
            Support Tsubaki Bot in here:{" "}
            <Button href="https://www.patreon.com/tsubaki_bot" target="_blank">
              Patreon
            </Button>
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default DonationButton;
