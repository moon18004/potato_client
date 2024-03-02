
// api
import { postCourse } from "../../api/course";
import useCourse from "../../hooks/useCourse";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

// components
import SelectBar from "../../components/course/SelectBar";
import CodeBox from "../../components/course/CodeBox";

// material ui
import { TextField, Box } from "@mui/material";
import { SubjectCategory } from "../../components/course/SubjectCategory";


function PostCourse(){
  const navigate = useNavigate();
  const {addCourse} = useCourse();
  const subjectData = SubjectCategory();

  // useState
  const [addContent, setAddContent] = useState([{ key: '1', val: '2' }, {key: '3', val: '4'}]);
  const [subjectValue, setSubjectValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [baseContent, setBaseContent] = useState(['test1', 'test2']);

  const handleAddContent = () => {
    const updateContents = [
      ...addContent,
      {
        key: 'new key',
        val: 'new value'
      },
    ]
    setAddContent(updateContents)
  }
  const handleInputAddContent = (index, event, keyVal) => {
    const inputAddContents = [...addContent];
    
    if(keyVal == 'val' && keyVal != 'key'){
      inputAddContents[index] = {
        [keyVal]: event.target.value,
        ['key']:inputAddContents[index].key
      }
    } else if(keyVal != 'val' && keyVal == 'key'){
      inputAddContents[index] = {
        [keyVal]: event.target.value,
        ['val']:inputAddContents[index].val
      }
    }
      
    setAddContent(inputAddContents);
  };

  const handleSubject = (e) => {
    setSubjectValue(e.target.value);
  }
  const handleCode =(e) => {
    setCodeValue(e.target.value);
  }

  const handleBaseContent =(event, index) => {
    const baseContentData = [...baseContent];
    console.log(baseContent);
    console.log(index);
    baseContentData[index] = event.target.value;
    setBaseContent(baseContentData);
  }

  const navigateToCourse = () => {
    navigate('/course');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let post = {};
    post.subject = subjectValue;
    post.class_code = codeValue;
    post.base_content = baseContent;
    post.add_content = addContent;
    console.log(post);
    try {
      const res = await addCourse.mutateAsync({ post });
      console.log(res);
      if (res.error) {
        console.log(res.message);
      } else {
        navigate('/course');
      }
    } catch (error) {
      console.error("데이터 추가 중 에러 발생:", error);
    }
  };

  return(
    <>
      <h1>Course Post</h1>
      <Box>
        <div class="firstParagraph">
            <div class="firstSentence">
              <p>Hi! This is Speaking Potato.</p>
            {/* <img src="../images/potatos.png" alt="speakingPotato" style="width: 40px; height: 40px;"> */}
            </div>
            <p>We aim to share insightful and valuable information with everyone.</p>
            <p>Below, you'll find guidance on good examples and content to avoid:</p>  
            <ul>
              <p class="good">Good Examples</p>
              <li>Emphasize positive aspects of the professor's teaching.</li>
              <li>Summarize the key points covered in the lecture.</li>
              <li>Provide solutions for challenging parts and how to overcome them.</li>
              <li>Highlight memorable moments from the lecture.</li>
              <li>Recommend preparatory materials for better understanding of the lecture.</li>
              <li>Suggest additional topics that could be covered to enhance learning.</li>
            </ul>
            <ul>
              <p class="bad">Poor Examples</p>
              <li>Negative criticism of professors or lectures.</li>
              <li>Mention of inappropriate methods to improve grades.</li>
            </ul>
          </div>
      </Box>

      <form onSubmit={handleSubmit}>
        <div style={{display: "flex"}}>
          <SelectBar 
            label="select an option"
            value={subjectValue}
            onChange={handleSubject}
            options={subjectData}
          />
          <CodeBox 
            value={codeValue}
            onChange={handleCode}
          />
        </div>
        
        {baseContent.map((content, index) => (
          <TextField
            required
            key={index}
            label={index}
            placeholder="write down"
            variant="filled"
            onChange={(e)=>handleBaseContent(e, index)}
            value={content}
          />
        ))}
        
        {addContent.map((pair, index) => (
        <div key={index}>
          <TextField
            required
            key={'key'+index}
            label={index}
            placeholder={`Enter key ${index + 1}`} 
            variant="filled"
            onChange={(e) => handleInputAddContent(index, e, 'key')} 
            value={pair.key}
            name={`key${index}`}
          />
          <TextField
            required
            key={'val'+index}
            label={index}
            placeholder={`Enter value ${index + 1}`} 
            variant="filled"
            onChange={(e) => handleInputAddContent(index, e, 'val')} 
            value={pair.val}
            name={`val${index}`}
          />
        </div>
      ))}

        <button type="button" onClick={handleAddContent}>Add new content</button>
        <button type="submit">Submit</button>
        <button type="button" onClick={navigateToCourse}>Cancel</button>  
      </form>
      
    </>
  )
}

export default PostCourse;