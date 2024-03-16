import { Box } from "@mui/material";

function NoticePosting(){
  return(
    <Box>
      <div>
          <div>
            <p>Hi! This is Speaking Potato.</p>
          {/* <img src="../images/potatos.png" alt="speakingPotato" style="width: 40px; height: 40px;"> */}
          </div>
          <p>We aim to share insightful and valuable information with everyone.</p>
          <p>Below, you'll find guidance on good examples and content to avoid:</p>  
          <ul>
            <p>Good Examples</p>
            <li>Emphasize positive aspects of the professor's teaching.</li>
            <li>Summarize the key points covered in the lecture.</li>
            <li>Provide solutions for challenging parts and how to overcome them.</li>
            <li>Highlight memorable moments from the lecture.</li>
            <li>Recommend preparatory materials for better understanding of the lecture.</li>
            <li>Suggest additional topics that could be covered to enhance learning.</li>
          </ul>
          <ul>
            <p>Poor Examples</p>
            <li>Negative criticism of professors or lectures.</li>
            <li>Mention of inappropriate methods to improve grades.</li>
          </ul>
        </div>
    </Box>
  )
}

export default NoticePosting;