import os
from keras.applications.vgg16 import VGG16
from keras.models import Sequential
from keras.layers import Dense, GlobalAveragePooling2D
import tensorflow as tf

def train_fun(data_dir="volumes/Dataset",input_size=(224,224)):
    num_classes = len(os.listdir(data_dir))
    batch_size = 32

    train_generator = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=input_size,
    batch_size=batch_size)

    valid_generator = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=input_size,
    batch_size=batch_size)

    base_model = VGG16(weights='imagenet', include_top=False, input_shape=input_size + (3,),classes=num_classes)

    for layer in base_model.layers:
        layer.trainable = False

    model=Sequential()
    model.add(base_model)
    model.add(GlobalAveragePooling2D())
    model.add(Dense(1024, activation='relu'))
    model.add(Dense(num_classes, activation='softmax'))

    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    model.fit(train_generator,epochs=10,validation_data=valid_generator)

    model.save('volumes/Saved_model/face_recognition_model.keras')
    return