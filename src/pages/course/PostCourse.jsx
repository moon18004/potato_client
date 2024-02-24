import { postCourse } from "../../api/course";
import { FormControl,InputLabel, Select, MenuItem } from "@mui/material"

function PostCourse(){
  let age = 20;
  return(
    <>
      <h1>Course Post</h1>
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
    </>
  )
}

export default PostCourse;