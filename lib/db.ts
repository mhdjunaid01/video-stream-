type User = {
  email: string
  password: string
}

const users: User[] = [ {email:'user@gmail.com' ,password:'$2b$10$TI50dhXNZJ49KAV96en/SekCjKsAkO6lSqMsPPKc90KRL0tGkUYMO'}]

export const addUser = (user: User) => {
  
  users.push(user)
}

export function existUser(email: string): User | undefined {
  return users.find(u => u.email === email);
}

export const getUserByEmail = (email: string) => users.find(u => u.email === email);