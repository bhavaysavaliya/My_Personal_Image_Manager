import { useState, useRef } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Confirm from './Confirm';

const DropzoneContainer = styled('div')({
  border: '2px solid whitesmoke',
  borderRadius:"10px",
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  maxWidth: '400px', // Set the maximum width of the container
  margin: '0 auto', // Center the container horizontally

  '& .content': {
    height: '150px', // Set the maximum height of the content
    overflowY: 'auto', // Add a scrollbar when content overflows
  },

  '& ul': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap', // Allow list items to wrap if there's not enough space
  },

  '& li': {
    flex: '0 0 calc(33.33% - 20px)', // Limit the width to one-third with some margin
    textAlign: 'left',
    marginBottom: '10px',
    wordWrap: 'break-word', // Allow long file names to wrap
  },
});

const Input = ({ getImage, dispUploadBtn, onImagesChange ,setDisconnect}) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter(
      (file) => file.type.startsWith('image/')
    );
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    onImagesChange([...files, ...droppedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (event) => {
    event.preventDefault();
    const selectedFiles = Array.from(event.target.files).filter(
      (file) => file.type.startsWith('image/')
    );
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    onImagesChange([...files, ...selectedFiles]);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index, event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onImagesChange(updatedFiles);
  };

  return (
    <div style={{ backgroundColor: "whitesmoke",margin:"10px"}}>
      <DropzoneContainer
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBrowseClick}
        style={{ backgroundColor: "lightblue" }}
      >
        <p>Drag and drop images here or click to browse</p>
        <div className="content">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            multiple
          />
          {files.length > 0 && (
            <div>
              <h4>Uploaded Images:</h4>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <span
                      style={{ cursor: 'pointer', marginLeft: '8px' }}
                      onClick={(event) => handleRemoveImage(index, event)} // Pass the event object
                    >
                      &#x2718;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DropzoneContainer>
      <div style={{ display: "flex", justifyContent: "center",margin:"10px" }}>
        <Confirm setDisconnect={setDisconnect}/>
        <Button variant="contained" id="uploadButton" onClick={getImage} disabled={dispUploadBtn} style={{marginLeft:"10px"}}>Upload</Button>
      </div>
    </div>
  );
};

export default Input;