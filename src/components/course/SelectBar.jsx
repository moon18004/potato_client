import * as React from 'react';
import styles from '../../styles/selectBar.module.css'
import { FormControl,InputLabel, Select, MenuItem } from "@mui/material"


function SelectBar({ label, value, onChange, options }){
  // handleChange
  return (
    <div className={styles.bar}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select 
          value={value} 
          onChange={onChange}
          variant='filled'>
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectBar
