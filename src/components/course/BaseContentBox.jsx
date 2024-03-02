import { TextField } from "@mui/material"
function BaseContentBox({value, onChange}){

  // let label = ''
  // if(key === 0){
  //   label = 'semester'
  // } else if(key === 1){
  //   label = 'year'
  // } else if(key === 2){
  //   label = 'yea3'
  // }
  return(
    <>
      <TextField
          required
          // label={label}
          placeholder="write down"
          variant="filled"
          onChange={onChange}
          value={value}
      />
    </>
  )
}

export default BaseContentBox