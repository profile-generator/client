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
        },
        htmltopdf(){
            let scripts = Array.prototype.map.call(
                document.getElementsByTagName('script'),
                script => script.outerHTML
            ).join('')

            let body = '<body>' +
                (document.getElementsByClassName('page')[0]).outerHTML +
                scripts +
                '<\/body>'

            // Stylesheet string
            let head = '<head><style>' +
                Array.prototype.map.call(
                    document.styleSheets,
                    stylesheet => Array.prototype.map.call(
                        stylesheet.cssRules,
                        rule => rule.cssText
                    ).join('')
                ).join('') +
                '<\/style><\/head>'

            axios.post('https://selectpdf.com/api2/convert/', {
                    key: '537e88db-a287-47b8-8425-4107f2d0f7a5',
                    html: head + body, // string to print into pdf
                    page_size: 'HalfLetter',
                    page_orientation: 'Landscape',
                    margin_top: '0pt',
                    margin_right: '0pt',
                    margin_bottom: '0pt',
                    margin_left: '0pt'
                }, {
                    "Content-Type": "application/json",
                    responseType: "arraybuffer"
                })
                .then(({ data }) => {
                    console.log('masuk')
                    let pdf = new Blob([data], { type: 'application/pdf' })

                    // pdf file url
                    let pdfFileURL = window.URL.createObjectURL(pdf);
                    let formData = new FormData()
                    formData.append('file', pdf)

                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.setAttribute('target', '_blank')
                    a.href = pdfFileURL;
                    a.download = pdf;
                    a.click();

                    // axios.post('http://localhost:3000/upload', formData, {
                    //         headers: {
                    //             'Content-Type': 'multipart/form-data',
                    //             token: localStorage.getItem('token')
                    //         }
                    //     })
                    //     .then(({ data }) => {
                    //         let a = document.createElement("a");
                    //         document.body.appendChild(a);
                    //         a.style = "display: none";
                    //         a.setAttribute('target', '_blank')
                    //         a.href = data.url;
                    //         a.download = data.file;
                    //         a.click();
                    //     })
                    //     .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }
})