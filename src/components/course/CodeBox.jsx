import { TextField } from "@mui/material";
import styles from '../../styles/course/codeBox.module.css'

function CodeBox({value, onChange}){
  return(
      <div className={styles.codeBox}>
        <TextField
          required
          id="outlined-required"
          label="class code"
          placeholder="ex) wdd230 -> 230"
          variant="filled"
          onChange={onChange}
          value={value}
          className={styles.textField}
        />
      </div>
  )
}

export default CodeBox;
