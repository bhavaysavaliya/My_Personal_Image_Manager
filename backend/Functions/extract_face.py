from yoloface import face_analysis 
face=face_analysis()

def faces_box(frame):
    _,box,conf=face.face_detection(frame_arr=frame,frame_status=True,model='full')
    for bx in box:
        bx[0]=max(0,bx[0])
        bx[1]=max(0,bx[1])
    return box

def extract_faces(original_image):
    extracted_faces=[]
    box=faces_box(original_image)
    for x,y,height,width in box:
        cropped_image = original_image[y:y+height, x:x+width]
        extracted_faces.append(cropped_image)
    return extracted_faces

def extract_faces_all(input_image_array):
    extract_faces_array=[]
    for input_image in input_image_array:
        # save image temporary to img_path
        extract_faces_array.append(extract_faces(input_image))
    return extract_faces_array