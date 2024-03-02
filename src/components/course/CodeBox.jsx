import { Box, TextField } from "@mui/material";

function CodeBox({value, onChange}){
  return(
    // <Box
    //   component="form"
    //   sx={{
    //     '& .MuiTextField-root': { m: 1, width: '25ch' },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
      <div>
        <TextField
          required
          id="outlined-required"
          label="class code"
          placeholder="ex) wdd230 -> 230"
          variant="filled"
          onChange={onChange}
          value={value}
        />
        
      
      </div>
    /* </Box> */
  )
}

export default CodeBox;
