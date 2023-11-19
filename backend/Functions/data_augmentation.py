import cv2
import random

def augment_image(image,num_augmented_images = 10):
    augmented_images = []
    for i in range(num_augmented_images):
        angle = random.randint(-20,20)
        rows, cols, _ = image.shape
        M = cv2.getRotationMatrix2D((cols / 2, rows / 2), angle, 1)
        augmented_image = cv2.warpAffine(image, M, (cols, rows))
        augmented_images.append(augmented_image)
    return augmented_images

def data_aug(add_faces):
    add_faces_array=[]
    for face in add_faces:
        add_faces_array.append(augment_image(face))
    return add_faces_array

def data_augmentation(filtered_non_predicted_faces_array):
    x=[]
    for faces in filtered_non_predicted_faces_array:
        ans=data_aug(faces)
        temp=[]
        for first in ans:
            for second in first:
                temp.append(second)
        x.append(temp)
    return x