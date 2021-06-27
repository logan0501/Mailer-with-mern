import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../Styles/Home.css'
const Editorq = (props) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    props.handlechange(convertedContent)
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  
  return (
    <div className="App" style={{marginBottom:"30px"}}>
      <lebel style={{fontSize: 20,color:"#206A5D",fontWeight:500}}>
        Mail body
      </lebel>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      
      
    </div>
  )
}
export default Editorq;