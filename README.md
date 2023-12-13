# My_Personal_Image_Manager
A project that sorts images in groups according to the presence of a person

# Introduction
This project is an implementation of a unique idea that says, you should only save those photos in which you are present to optimize your device's memory. <br/>
The idea of this project is to sort images in groups according to the presence of a person. For example: If there are 20 images uploaded and 8 images have a person's presence, then the project will create a folder with the folder name as the person's name and the folder will only contain those 8 images in which the person is present. Then in return a zip of all folders will be returned after clicking download. This project is deployed using Docker.

# Working 
The front end is created using React Vite. The backend is created using Flask. Through the front end, the user uploads all images, and the images are sent to the backend one by one and will perform the following tasks.
1. The faces are extracted from an image and saved to the User_input folder. 
2. Then the faces are passed to the model to identify the faces. If faces are not identified then it sends a request to the user through the front end to name new people's images. 
3. As soon as the user names all the images, a message will appear as "All images processed". Then user can click on download to get zip.
4. While in the backend as soon as the user names new images, first data augmentation is performed to increase dataset size. Then all new augmented images are saved in the dataset. 
5. On clicking update, the model is trained on the updated dataset and overwrites the existing model, so the next time you use this project, the model will recognize more faces than the previous time.

# Requirements to run on your system
1. Docker
2. Internet Data (max 5GB)
3. 8GB RAM

# How to run the project
1. Clone the repository.
```bash
git clone https://github.com/bhavaysavaliya/My_Personal_Image_Manager.git
```
</br>

2. Open the terminal and go to the directory where the repository is cloned.
```bash
cd My_Personal_Image_Manager
```
</br>

3. Make sure you have installed docker in your system. If not, then install it.
</br>

4. Run the following command to deploy the project using docker:
```bash
docker-compose up --build
```
</br>

5. After the image is built, open the browser and go to the following link:
```bash
http://localhost:3000/
```
</br>

6. Now, you can upload the image of a dog and then click on the predict button to get the result.
</br>

7. To stop the docker, run the following command:
```bash
docker-compose down
```

# Future Scope
This project can be integrated with image managing apps and social media apps. This saves the user time and helps in optimizing memory space as the user will only save those photos in which he is present.
