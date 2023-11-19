# My_Personal_Image_Manager
A project that sort images in groups according to the presence of a person

# Introduction
This project is an implementation of a unique idea that says, you should only save those photos in which you are present in order to optimize your device's memory. <br/>
The idea of this project is to sort images in groups according to the presence of a person. For example: If there are 20 images uploaded and 8 images has a person's presence, then the project will create a folder with folder name as person name and the folder will only contain those 8 images in which the person is present. Then in return a zip of all folders will be returned after clicking download. This project is deployed using Docker.

# Working 
The frontend is created using React Vite. The backend is created using Flask. Through frontend, user upload all images and the images are sended to the backend one by one and will perform the following tasks.
1. The faces are first extracted from an image and saved to User_input folder. 
2. Then the faces are passed to the model to identify the faces. If faces are not identified then it sends request to the user through frontend to name new people's image. 
3. As soon as the user names the all the images, a message will appear as "All images processed". Then user can click on download to get zip.
4. While in the backend as soon as the user names, first data augmentation is performed to increase size of dataset. Then all new the augmented images are saved in dataset. 
5. On clicking update, the model is trained on the updated dataset and overwrites the existing model, so next time when you use this project, model would recognise more faces than previous time.

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

4. Run the following command to deploy project using docker:
```bash
docker compose up --build
```
</br>

5. After the image is built, open the browser and go to the following link:
```bash
http://localhost:3000/
```
</br>

6. Now, you can upload the image of dog and then click on predict button to get the result.
</br>

7. To stop the docker, run the following command:
```bash
docker compose down
```

# Future Scope
This project can be integrated image managing apps and social media apps. This saves user time and helps in optimizing memory space as the user will only save those photos in which he is present.