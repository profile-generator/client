let baseURL = "http://localhost:3000"

const app = new Vue({
    el: "#app",
    data: {
        User:{
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
        },
        isLogin: false,
        isRegis:false
    },
    // created:()=>{
    // },
    methods:{
        register(){
            axios({
                method: "POST",
                url: `${baseURL}/Users`, 
                data: this.User
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
                alert("Succes register Data")
            })
            .catch(err => {
                alert("failed register data")
            })
        },
        login(email){
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
                if (response.data.length == 0){
                    alert('not found')
                }else{
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