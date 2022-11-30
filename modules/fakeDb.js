const fakeDb = {
    users : [
        {id : 1, name : 'Paul'},
        {id : 2, name : 'Jacques'},
        {id : 3, name : 'Pierre'},
        {id : 4, name : 'Scoobidoo'},
    ],
    
}

let compteur = fakeDb.users.length + 1

const getAllUsers = () => {
    return fakeDb.users
}

const getUserById = (id) => {
    return fakeDb.users.find(u => u.id == id)
}

const createUser = (name) => {
    fakeDb.users.push({id : compteur, name: name})
    compteur++
}

const updateUser = (id, name) =>{
    const user = getUserById(id)
    if (user) {
        getUserById(id).name = name
        return true;
    }
    else{
        return false
    }
    
}

const deleteUser = (id) => {
    const index = fakeDb.users.indexOf(getUserById(id))
    if (index != undefined) {
        fakeDb.users.splice(index, 1)
        return true;
    }
    return false;
    
}

module.exports = { getAllUsers, getUserById, updateUser, createUser, deleteUser}