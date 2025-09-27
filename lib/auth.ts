type User ={
    email :string
    password:string
}

const users :User[]= []

export const existUser = (email:string )=>{

    return users.find(u => u.email===email)

}

export const addUser = (user:User) =>{
    users.push(user)
}