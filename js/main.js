let baseURL = "http://localhost:3000"


const app = new Vue({
    el: "#app",
    data: {
        User: {
            id: "",
            name: "",
            email: "",
            password: "",
            age: new Date(),
            gender: "",
            location: "",
            phoneNumber: "",
            work: "",
            hobbies: [],
            image: null
        },
        isLogin: false,
        isRegis: false
    },
    // created:()=>{
    // },
    methods: {
        register() {

            this.isLoading = true;
            const params = new FormData();

            params.append("name", this.User.name);
            params.append("email", this.User.email);
            params.append("password", this.User.password);
            params.append("birthdate", this.User.age);
            params.append("gender", this.User.gender);
            params.append("location", this.User.location);
            params.append("phoneNumber", this.User.phoneNumber);
            params.append("work", this.User.work);
            params.append("hobbies", this.User.hobbies);


            if (this.User.image) {
                params.append("image", this.User.image);
            }
            // axios
            //     .post("/products", params, {
            //         headers: {
            //             token: this.token
            //         }
            //     })
            //     .then(({ data }) => {
            //         this.$emit("addProduct", data);
            //         this.$parent.close();
            //         this.isLoading = false;
            //     });
            axios({
                    method: "POST",
                    url: `${baseURL}/register`,
                    data: params
                })
                .then(response => {
                    this.User = {
                        id: "",
                        name: "",
                        email: "",
                        password: "",
                        age: new Date(),
                        gender: "",
                        location: "",
                        phoneNumber: "",
                        work: "",
                        hobbies: [],
                        image: null
                    }
                    alert("Succes register Data")
                })
                .catch(err => {
                    alert("failed register data")
                })
        },
        login(email) {
            axios({
                    method: "GET",
                    url: `${baseURL}/Users?email=${email}`,
                    data: {
                        email: this.User.email,
                        password: this.User.password
                    }
                })
                .then(response => {
                    this.User = {
                        id: "",
                        name: "",
                        email: "",
                        password: "",
                        age: "",
                        gender: "",
                        location: "",
                        phoneNumber: "",
                        work: "",
                        hobbies: [],
                        image: null
                    }
                    if (response.data.length == 0) {
                        alert('not found')
                    } else {
                        alert('Success login data')
                    }
                })
                .catch(err => {
                    console.log(err)
                    alert("failed login data")
                })
        }
    }
})