class GitHub{
    #endpoint = `https://api.github.com/users/`;
    getUser(login){
        return fetch(this.#endpoint + login).then((r)=> {
            if(r.status === 200){
                return r.json();
            }
            return Promise.reject(r.status);
        });
    }
}