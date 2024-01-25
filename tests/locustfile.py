from locust import HttpUser, between, task

class PhotoGalleryUser(HttpUser):
    wait_time = between(1, 5)

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.register_user()
        self.login_user()

    def register_user(self):
        self.client.post("/api/users/register", json={
            "username": "test_user",
            "email": "test@example.com",
            "password": "password123"
        })

    def login_user(self):
        response = self.client.post("/api/users/login", json={
            "email": "test@example.com",
            "password": "password123"
        })
        self.token = response.json()['token']

    @task
    def get_gallery(self):
        # Assuming the userID is known and is '12345'
        self.client.get("/images/12345", headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def add_image(self):
        # Assuming the userID is known and is '12345'
        # and 'image_data' is the data of the image to be uploaded
        self.client.post("/images/add/12345", files={
            "images": ("filename", "image_data", "image/jpeg")
        }, headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def delete_image(self):
        # Assuming the userID is '12345' and imageID is '67890'
        self.client.delete("/images/12345/67890", headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def get_gallery(self):
        # Assuming the userID is known and is '12345'
        self.client.get("/images/12345", headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def add_image(self):
        # Assuming the userID is known and is '12345'
        # and 'image_data' is the data of the image to be uploaded
        self.client.post("/images/add/12345", files={
            "images": ("filename", "image_data", "image/jpeg")
        }, headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def delete_image(self):
        # Assuming the userID is '12345' and imageID is '67890'
        self.client.delete("/images/12345/67890", headers={
            "Authorization": f"Bearer {self.token}"
        })
    @task
    def get_gallery(self):
        # Assuming the userID is known and is '12345'
        self.client.get("/images/12345", headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def add_image(self):
        # Assuming the userID is known and is '12345'
        # and 'image_data' is the data of the image to be uploaded
        self.client.post("/images/add/12345", files={
            "images": ("filename", "image_data", "image/jpeg")
        }, headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def delete_image(self):
        # Assuming the userID is '12345' and imageID is '67890'
        self.client.delete("/images/12345/67890", headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def get_gallery(self):
        # Assuming the userID is known and is '12345'
        self.client.get("/images/12345", headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def add_image(self):
        # Assuming the userID is known and is '12345'
        # and 'image_data' is the data of the image to be uploaded
        self.client.post("/images/add/12345", files={
            "images": ("filename", "image_data", "image/jpeg")
        }, headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def delete_image(self):
        # Assuming the userID is '12345' and imageID is '67890'
        self.client.delete("/images/12345/67890", headers={
            "Authorization": f"Bearer {self.token}"
        })
