import { useState, useEffect } from "react";
import JSZip from "jszip";
import Input from "./Input";
import Show from "./Show";
import Button from '@mui/material/Button';
import axios from 'axios';
import { Alert } from '@mui/material';

const Main = () => {
  const [dispUploadBtn, setDispUploadBtn] = useState(false);
  const [dispPrevBtn, setDispPrevBtn] = useState(false);
  const [dispNextBtn, setDispNextBtn] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [index, setIndex] = useState(null);
  const [i, setI] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [personName, setPersonName] = useState('');
  const [files, setFiles] = useState([]);
  const [imageNameArray, setImageNameArray] = useState([]);
  const [totalNames, setTotalNames] = useState([]);
  const [perdictedNames, setPredictedNames] = useState(null);
  const [zip, setZip] = useState(new JSZip());
  const [imageFetched, setImageFetched] = useState(false);
  const [gotRequest, setGotRequest] = useState(false);
  const [message, setMessage] = useState(false);
  const [disconnect, setDisconnect] = useState(false);
  const [noImage, setNoImage] = useState(false);

  const handleImagesChange = (newImages) => {
    setUploadedFiles(newImages);
  };
  const getImage = () => {
    setMessage(false);
    if (uploadedFiles.length === 0) {
      setNoImage(true);
      setDisconnect(false);
      setMessage(false);
    }
    else {
      setNoImage(false);
      setFiles(uploadedFiles);
      setIndex(0);
      sendRequest(uploadedFiles[0]);
    }
  };

  useEffect(() => {
    const save = (folderNames, predictedNames, file) => {
      const final_array = Array.from(new Set(predictedNames.concat(folderNames)));
      if (final_array.length > 0) {
        final_array.forEach(folderName => {
          if (folderName !== "") {
            let folder = zip.folder(folderName);
            if (!folder) {
              folder = zip.folder(folderName);
            }
            folder.file(file.name, file);
          }
        })
      }
      setZip(zip.clone());
    }
    if (gotRequest && imageArray.length === 0) {
      save(perdictedNames, [], files[index]);
      setGotRequest(false);
      setIndex(index + 1);
      if (index < files.length - 1) {
        sendRequest(files[index + 1]);
      }
      else {
        setMessage(true);
        setNoImage(false);
        setDisconnect(false);
        setImageFetched(false);
      }
    }
  }, [index, files, imageArray, gotRequest, perdictedNames, zip]);

  const sendRequest = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target.result;
      const data = {
        filename: file.name,
        image: base64Image,
      };
      axios.post(import.meta.env.VITE_BACKEND_PATH+"/user_input", data)
        .then((response) => {
          const data = response.data;
          setDisconnect(false);
          setImageArray(data.img_arr);
          setPredictedNames(data.results);
          setGotRequest(true);
          if (data.img_arr.length === 0) {
            setGotRequest(true);
            return;
          }
          else {
            setImageFetched(true);
            setDispPrevBtn(true);
            setDispNextBtn(false);
            setI(0);
          }
          console.log(data.img_arr.length);
        })
        .catch((error) => {
          setDisconnect(true);
          setNoImage(false);
          setMessage(false);
          console.error('Error uploading image:', file.name, error);
        });
    };
    reader.readAsDataURL(file);
  };

  const previousImage = () => {
    if (i === 0) {
      return;
    } else {
      setDispPrevBtn(false);
      setPersonName(imageNameArray[i - 1]);
      if (i === 1) {
        setDispPrevBtn(true);
      }
      setI((prevI) => prevI - 1);
    }
  };


  const nextImage = () => {
    setDispPrevBtn(false);
    var temp = imageNameArray;
    if (i === imageArray.length - 1) {
      if (imageNameArray.length === i) {
        setImageNameArray((imageNameArray) => [...imageNameArray, personName]);
        temp = [...imageNameArray, personName];
      }
      else {
        imageNameArray[i] = personName;
        setImageNameArray([...imageNameArray]);
        temp[i] = personName;
      }
      const j = index + 1;
      setIndex(index + 1);
      setTotalNames([...totalNames, temp]);
      save(temp, perdictedNames, files[index]);
      submitResponse(temp);
      setImageNameArray([]);
      setDispPrevBtn(true);
      setDispNextBtn(true);
      if (j < files.length) {
        sendRequest(files[j]);
      }
      else {
        setDispUploadBtn(false);
        setImageFetched(false);
        setMessage(true);
      }
    }
    else {
      if (imageNameArray.length === i) {
        setImageNameArray((imageNameArray) => [...imageNameArray, personName]);
        temp = [...imageNameArray, personName];
      }
      else {
        imageNameArray[i] = personName;
        setImageNameArray([...imageNameArray]);
        temp[i] = personName;
      }
      if (i + 1 < imageNameArray.length) {
        setPersonName(temp[i + 1]);
      }
      else {
        setPersonName('');
      }
      setI((prevI) => prevI + 1);
    }
  };

  const handleNameChange = (event) => {
    setPersonName(event.target.value);
  };

  const submitResponse = (names) => {
    axios.post(import.meta.env.VITE_BACKEND_PATH +'/response', names)
      .then((response) => {
        console.log(response.data.states);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const save = (folderNames, predictedNames, file) => {
    const final_array = Array.from(new Set(predictedNames.concat(folderNames)));
    if (final_array.length > 0) {
      final_array.forEach(folderName => {
        if (folderName !== "") {
          let folder = zip.folder(folderName);
          if (!folder) {
            folder = zip.folder(folderName);
          }
          folder.file(file.name, file);
        }
      })
    }
    setZip(zip.clone());
  }

  const download = () => {
    zip.generateAsync({ type: 'blob' })
      .then(function (content) {
        // Create a download link for the zip file
        var link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'results.zip';
        link.click();
      });
  }

  return (
    <>
      <div style={{ backgroundColor: "whitesmoke", maxWidth: "500px", margin: "0 auto", paddingBottom: "10px", borderRadius: "10px", marginTop: "20px" }}>
        <div style={{ maxWidth: "460px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center" }}>My Personal Image Manager</h1>
          <Input getImage={getImage} dispUploadBtn={dispUploadBtn} onImagesChange={handleImagesChange} setDisconnect={setDisconnect} />
          {noImage && (
            <div style={{ textAlign: "center", margin: "0 auto", maxWidth: "240px" }}>
              <Alert severity="error">No image selected !!!</Alert>
            </div>
          )}
          {disconnect && (
            <div style={{ textAlign: "center", margin: "0 auto", maxWidth: "240px" }}>
              <Alert severity="error">Server is not connected !!!</Alert>
            </div>
          )}
        </div>
        {imageFetched && (
          <div style={{ backgroundColor: "lightblue", maxWidth: "440px", margin: "0 auto", paddingBottom: "40px", borderRadius: "10px", marginBottom: "10px" }}>
            <h1 style={{ textAlign: "center", paddingTop: "10px" }}>New Faces Detected</h1>
            <Show imageurl={imageArray[i]} previousImage={previousImage} nextImage={nextImage} dispPrevBtn={dispPrevBtn} dispNextBtn={dispNextBtn} personName={personName} handleNameChange={handleNameChange} />
          </div>
        )}
        {message && (
          <div style={{ textAlign: "center", margin: "0 auto", maxWidth: "230px" }}>
            <Alert style={{ textAlign: 'center' }} severity="success">All Images Processed !!!</Alert>
          </div>
        )}
        {index > 0 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={download}>Download</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Main;