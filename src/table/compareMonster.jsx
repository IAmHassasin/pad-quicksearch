import React, { useState } from "react";
import { Button, Dialog, DialogContent, Grid } from "@mui/material";
import AwokenSelector from "./awkSelector/awkSelector";
import { Balance } from "@mui/icons-material";
import MonsterCard from "./monsterCard/monsterCard";

const CompareDialog = ({ selectedMonsterIds }) => {
  const [selectedAwokens, setSelectedAwokens] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Balance />
      </Button>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent style={{ height: "80vh" }}>
          <Grid container direction="column" style={{ height: "100%" }}>
            {/* First Row */}
            <Grid item xs={1}>
              <AwokenSelector setSelectedAwokens={setSelectedAwokens} />
            </Grid>
            {/* Second Row */}
            <Grid item xs={11}>
              <Grid container direction="row" style={{ height: "100%" }}>
                <MonsterCard />
                <MonsterCard />
                <MonsterCard />
                <MonsterCard />
                <MonsterCard />
                <MonsterCard />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompareDialog;
