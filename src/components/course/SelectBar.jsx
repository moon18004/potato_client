import * as React from 'react';
import styles from '../../styles/selectBar.module.css'
import { FormControl,InputLabel, Select, MenuItem } from "@mui/material"



function SelectBar(){
  let age = 20;
  // handleChange
  return (
    <div className={styles.bar}>
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Subject</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        // onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
    </div>
  )
}

export default SelectBar
