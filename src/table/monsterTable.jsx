import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const MonsterTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter function based on monster_id and name_en
  const filteredData = data.filter(item =>
    searchTerm !== '' ? item.monster_id.toString() === searchTerm : true
  );

  return (
    <div style={{ marginTop: '20px',}}>
      {/* Search input */}
      <TextField
        label="Search by ID"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant='head'>Monster ID</TableCell>
              <TableCell variant='head'>Name (EN)</TableCell>
              <TableCell variant='head'>HP / ATK / RCV</TableCell>
              <TableCell variant='head'>Active Skill</TableCell>
              <TableCell variant='head'>CD: Min / Max</TableCell>
              <TableCell variant='head'>Leader Skill</TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.monster_id}>
                <TableCell>{row.monster_id}</TableCell>
                <TableCell>{row.name_en}</TableCell>
                <TableCell>{`${row.hp_max} / ${row.hp_max} / ${row.rcv_max}`}</TableCell>
                <TableCell>{row.active_skill_desc_en}</TableCell>
                <TableCell>{`${row.turn_min} / ${row.turn_max}`}</TableCell>
                <TableCell>{row.leader_skill_desc_en}</TableCell>
                {/* Add more table cells as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MonsterTable;
