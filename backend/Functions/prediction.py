import numpy as np
import cv2
from copy import copy
import os

def predict(image_array,model,input_size=(224,224),threshold=0.85):
    temp=copy(image_array)
    for i in range(len(temp)):
        temp[i]=cv2.resize(temp[i],input_size)
    temp=np.array(temp)
    pred=model.predict(temp)
    pred=np.array(pred)
    y=[]
    for x in pred:
        if max(x)>=threshold:
            y.append(x.argmax())
        else:
            y.append(-1)
    return y

def get_labels(path="volumes/Dataset"):
    labels=[]
    for path in os.listdir(path):
        labels.append(path)
    return labels


def separate_unknown_faces(extract_faces_array,labels,model,isinRange=False):
    not_predicted_faces_array=[]
    predicted_faces_results=[]
    if isinRange:
        predictions=predict(extract_faces_array,model)
        for i in range(len(predictions)):
            if predictions[i]!=-1:
                predicted_faces_results.append(labels[predictions[i]])
            else:
                not_predicted_faces_array.append(extract_faces_array[i])
    else:
        not_predicted_faces_array=extract_faces_array
    return predicted_faces_results,not_predicted_faces_array