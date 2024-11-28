let token = localStorage.getItem("token")
token = token ? JSON.parse(token) : ''


class api {
    url = "https://backend-eccomerce-two.vercel.app/api"

    async login(email: string, password: string) {
        return fetch(`${this.url}/login/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
            console.error("error", err);
        })
    }

    async getProducts() {
        return fetch(`${this.url}/products`)
        .then((res) => res.json())
        .then(data => data)
        .catch((err) => {
            console.error("error", err);
        })
    }

    async getBrand(){
        return fetch(`${this.url}/brand`)
        .then((res) => res.json())
        .then(data => data)
        .catch((err) => {
            console.error("error", err);
        })
    }

    async getCategory(){
        return fetch(`${this.url}/category`)
        .then((res) => res.json())
        .then(data => data)
        .catch((err) => {
            console.error("error", err);
        })
    }

    async getSubCategory(id : string){
        return fetch(`${this.url}/category/subcategory/cat/${id}`)
        .then((res) => res.json())
        .then(data => data)
        .catch((err) => {
            console.error("error", err);
        })
    }

    async uploadImage(data : any){
        return fetch(`${this.url}/img/upload`, {
            method : "POST",
            headers : {
                "Authorization" : `Bearer ${token}`
            },
            body : data
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((err) => {
            console.error("error", err);
        })
    }

    async addProduct(data : any){
        return fetch(`${this.url}/products`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(data)
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((err) => {
            console.error("error", err);
        })
    }

}

export default new api()