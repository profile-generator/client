var baseURL = "http://localhost:3000"


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
        isRegis: false,
        isLoggedIn: true,
        users: [],
        currentUser: {},

        afterLogin: {
            homePage: true,
        }

    },
    created() {
        if (localStorage.token) {
            this.isLoggedIn = true;
            this.getUser();
            axios({
                method: "GET",
                url: `${baseURL}/users/`,
                headers: { token: localStorage.token },
            })
                .then(({ data }) => {
                    console.log(data);
                    this.users = data;
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.isLoggedIn = false;
        }
    },

    watch: {
        users: function (newUsers, oldUsers) {
            this.users.forEach((user) => {
                // user.birthdate = user.birthdate.toDateString()
                // console.log(typeof user.birthdate)
                const date = new Date(user.birthdate).toDateString().slice(3);
                user.birthdate = date;
            })
        }
    },
    methods: {
        toHomePage() {
            this.afterLogin.homePage = true;
        },
        toProfilePage() {
            this.afterLogin.homePage = false;
        },
        like(id){
            this.currentUser.likes.push(id)
        },
        dislike(id){
            this.currentUser.likes = this.currentUser.likes.filter(userId => userId !== id)
        },
        getUser() {
            axios({
                method: "GET",
                url: `${baseURL}/users/${localStorage.userId}`,
                headers: { token: localStorage.token },
              })
              .then(({ data }) => {
                console.log(data);
                this.currentUser = data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getUsers() {
            axios({
                method: "GET",
                url: `${baseURL}/users/`,
                headers: { token: localStorage.token },
            })
                .then(({ data }) => {
                    console.log(data);
                    this.users = data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

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
                .then(({ data }) => {
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
                    console.log({ data });

                    this.isRegis = false;
                    this.getUsers();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        login(email) {
            axios({
                method: "POST",
                url: `${baseURL}/signin`,
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
                    } else {
                        console.log(response.data)
                        this.isLoggedIn = true;
                        localStorage.token = response.data.token;
                        localStorage.userId = response.data.userId;
                        this.getUsers();

                        return axios({
                            method: "GET",
                            url: `${baseURL}/users/${response.data.userId}`,
                            headers: { token: localStorage.token },
                        })
                    }
                })
                .then(({ data }) => {
                    this.currentUser = data;
                    console.log(this.currentUser);
                })
                .catch(err => {
                    console.log(err)
                })
        },

        signOut() {
            localStorage.clear();
            this.isLoggedIn = false;
        }
    }
})