let users = [];

const userAdd = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const userExist = users.find((user) => user.name === name && user.room === room);
    if(userExist || name === 'admin'){
        return {
            error : "Username already taken"
        }
    }
    const user = {id, name, room};
    users.push(user);
    console.log("userAdd -> users", users)
    return {
        user
    }
}

const userDelete = (id) => {
    const deleteUser = users.find((user) => user.id === id);
    users = users.filter((user) => !(user.id === id));
    return deleteUser;
}

const getUser = (id) => {
    const user = users.find((user) => user.id === id);
    return user;
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase();
    const usersInRoom = users.filter((user) => user.room === room);
    console.log("getUsersInRoom -> usersInRoom", usersInRoom)
    return usersInRoom;
}

module.exports = {
    getUsersInRoom,
    getUser,
    userDelete,
    userAdd
}