import io
import os
import base64
from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
from PIL import Image
import cv2
from Functions.extract_face import extract_faces
from Functions.prediction import separate_unknown_faces,get_labels
from Functions.data_augmentation import data_aug
from Functions.data_to_dataset import add_data_to_dataset
from Functions.train_model import train_fun
from keras.models import load_model

is_model_loaded=False
model=None
if len(os.listdir("volumes/Saved_model"))>0:
    model=load_model("volumes/Saved_model/face_recognition_model.keras")
    is_model_loaded=True

faces_array=[]
status=False
def image_to_base64(image):
    _, buffer = cv2.imencode('.jpg', image)
    encoded_image = base64.b64encode(buffer)
    return encoded_image.decode('utf-8')

app = Flask(__name__)
cors=CORS(app)
@app.route('/train',methods=['GET'])
def train():
    global status
    path=os.listdir('volumes/Dataset')
    if len(path)<5:
        return jsonify({"message":"Required "+str(5-len(path))+" more classes"})
    else:
        if status==False:
            return jsonify({"message":"Model not updated"})
        else:
            train_fun()
            status=False
            return jsonify({"message":"Successfully trained"})
        
@app.route('/user_input',methods=['POST'])
@cross_origin()
def input():
    # SAVING BASE64 IMAGE TO USER_INPUT DIRECTORY
    data = request.get_json()
    filename = data['filename']
    image_base64 = data['image']
    image_base64 = image_base64.split(',')[1]
    image_data = base64.b64decode(image_base64)
    image = Image.open(io.BytesIO(image_data))
    image.save("User_input/"+filename)
    # ----------------------------------------------------------------------
    # EXTRACTING FACES FROM IMAGE
    path=os.listdir(path="User_input")
    image=cv2.imread("User_input/"+path[0],cv2.IMREAD_COLOR)
    extract_faces_array=extract_faces(image)
    # ----------------------------------------------------------------------
    # PREDICT ALL FACES AND SEPARATE PREDICTED AND NOT PREDICTED FACES
    labels=get_labels()
    check_len_path=len(os.listdir('volumes/Dataset'))
    global is_model_loaded
    global model
    if check_len_path and is_model_loaded==False:
        model=load_model("volumes/Saved_model/face_recognition_model.keras")
        is_model_loaded=True      
    predicted_faces_results,not_predicted_faces_array=separate_unknown_faces(extract_faces_array,labels,model,isinRange=(check_len_path>5))
    global faces_array
    faces_array=not_predicted_faces_array
    # ----------------------------------------------------------------------
    # CONVERTING NOT PREDICTED IMAGES TO BASE64 FORMAT TO SEND IN CLIENT SIDE
    img_arr=[]
    for img in not_predicted_faces_array:
        img_arr.append(image_to_base64(img))
    # ----------------------------------------------------------------------
    # DELETING PARENT IMAGE AFTER EXTRACTING ALL INFORMATION
    os.remove("User_input/"+path[0])
    # ----------------------------------------------------------------------
    # RETURNING EXTRACTED INFORMATION
    print(len(img_arr))
    return jsonify({"img_arr":img_arr,"results":predicted_faces_results})

@app.route('/response',methods=['POST'])
def response():
    global status
    if status==False:
        status=True
    global faces_array
    names=request.get_json()
    print(names)
    data_augment=data_aug(faces_array)
    add_data_to_dataset(data_augment,names)
    return jsonify({"states":"SUCCESS"})


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)