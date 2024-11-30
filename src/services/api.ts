import type { category } from "@/types/dbType";

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
            body: JSON.stringify({ email, password })
        }).then((res) => {
            if(!res.ok) return false

            return res.json()
        })
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

    async getBrand() {
        return fetch(`${this.url}/brand`)
            .then((res) => res.json())
            .then(data => data)
            .catch((err) => {
                console.error("error", err);
            })
    }

    async getCategory() {
        return fetch(`${this.url}/category`)
            .then((res) => res.json())
            .then(data => data)
            .catch((err) => {
                console.error("error", err);
            })
    }

    async getSubCategory(id: string) {
        return fetch(`${this.url}/category/subcategory/cat/${id}`)
            .then((res) => res.json())
            .then(data => data)
            .catch((err) => {
                console.error("error", err);
            })
    }

    async uploadImage(data: any) {
        return fetch(`${this.url}/img/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: data
        })
            .then((res) => res.json())
            .then(data => data)
            .catch((err) => {
                console.error("error", err);
            })
    }

    async addProduct(data: any) {
        return fetch(`${this.url}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if(!res.ok) return false

                return res.json()
            })
            .then(data => data)
            .catch((err) => {
                console.error("error", err);
            })
    }

    async addCategory(data: category) {
        return fetch(`${this.url}/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (!res.ok) return false
                return res.json()
            })
            .then(data => data)
            .catch((err) => {
                console.error("error", err);
            })
    }

    async addBrand(data: category) {
        return fetch(`${this.url}/brand`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (!res.ok) return false
                return res.json()
            })
            .then(data => data)
            .catch((err) => {
                console.error("error", err);
            })
    }

    async deleteProduct(id: any) {
        return fetch(`${this.url}/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => {
                if(!res.ok) return false

                return res.json()
            })
            .catch((err) => {
                console.error("error", err);
            })
    }

    async deleteCategory(id: any) {
        return fetch(`${this.url}/category/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => {
                if(!res.ok) return false

                return res.json()
            })
            .catch((err) => {
                console.error("error", err);
            })
    }

    async deleteBrand(id: any) {
        return fetch(`${this.url}/brand/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => {
                if(!res.ok) return false

                return res.json()
            })
            .catch((err) => {
                console.error("error", err);
            })
    }

}

export default new api()