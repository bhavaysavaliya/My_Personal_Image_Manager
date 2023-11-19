import os
import cv2

def add_data_to_dataset(add_faces_array,input_names):  
    for i in range(len(input_names)):
        if input_names[i]!="":
            if not os.path.exists(os.path.join("volumes/Dataset",str(input_names[i]))):
                os.makedirs(os.path.join("volumes/Dataset",str(input_names[i])))
                for j in range(len(add_faces_array[i])):
                    save_path = 'volumes/Dataset/'+str(input_names[i])+'/'+str(input_names[i])+'_'+str(j)+'.jpg'
                    cv2.imwrite(save_path, add_faces_array[i][j])
            else:
                k=len(os.listdir(os.path.join("volumes/Dataset",input_names[i])))
                for j in range(len(add_faces_array[i])):
                    save_path ='volumes/Dataset/'+str(input_names[i])+'/'+str(input_names[i])+'_'+str(k+j)+'.jpg'
                    cv2.imwrite(save_path, add_faces_array[i][j])
    return

