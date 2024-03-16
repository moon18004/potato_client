import styles from '../../styles/course/postCourse.module.css'

// api
import { postCourse } from "../../api/course";
import useCourse from "../../hooks/useCourse";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

// components
import SelectBar from "../../components/course/SelectBar";
import CodeBox from "../../components/course/CodeBox";

// material ui
import { TextField } from "@mui/material";
import { SubjectCategory } from "../../components/course/SubjectCategory";
import AddBoxIcon from '@mui/icons-material/AddBox';


function PostCourse(){
  const navigate = useNavigate();
  const {addCourse} = useCourse();
  const subjectData = SubjectCategory();
  const baseContentName = ['Year/Semester', 'Professor']
  // useState
  const [addContent, setAddContent] = useState([{ key: '', val: '' }, {key: '', val: ''}]);
  const [subjectValue, setSubjectValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [baseContent, setBaseContent] = useState(['test1', 'test2']);

  const handleAddContent = () => {
    const updateContents = [
      ...addContent,
      {
        key: '',
        val: ''
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
    <div className={styles.postCourse}>
      <h1>Course Post</h1>
      <hr />
      <form onSubmit={handleSubmit} className={styles.submitForm}>
        <div className={styles.code}>
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
        <hr />
        {baseContent.map((content, index) => (
          <div key={index} className={styles.baseContent}>
            <p>{baseContentName[index]}</p>
            <TextField
              required
              key={index}
              label={baseContentName[index]}
              placeholder="write down"
              variant="filled"
              onChange={(e)=>handleBaseContent(e, index)}
              value={content}
              className={styles.baseTextField}
            />
          </div>
        ))}

        <hr />

        {addContent.map((pair, index) => (
          <div key={index} className={styles.addContents}>
            <p>Free Q/A</p>
            <TextField
              required
              key={'key'+index}
              label={'Question'}
              placeholder={`Enter key ${index + 1}`} 
              variant="filled"
              onChange={(e) => handleInputAddContent(index, e, 'key')} 
              value={pair.key}
              name={`key${index}`}
              className={styles.addKey}
            />
            <div className={styles.space}></div>
            <TextField
              required
              key={'val'+index}
              label={'Answer'}
              placeholder={`Enter value ${index + 1}`} 
              variant="filled"
              onChange={(e) => handleInputAddContent(index, e, 'val')} 
              value={pair.val}
              name={`val${index}`}
              className={styles.addValue}
            />
            <div className={styles.space}></div>
            <div className={styles.space}></div>
          </div>
        ))}
        <div className={styles.addButtons}>
          <p>Add new Q/A</p>
          <button type="button" onClick={handleAddContent} className={styles.addButton}><AddBoxIcon></AddBoxIcon></button>
        </div>
        <hr />
        <div className={styles.buttons}>
          <button type="submit" className={styles.submit}>Submit</button>
          <button type="button" onClick={navigateToCourse} className={styles.cancel}>Cancel</button>  
        </div>
      </form>
    </div>
  )
}

export default PostCourse;