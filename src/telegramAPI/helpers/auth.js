const users = require("./users")

module.exports = (id,match) => {
    const password = match[0].split(" ")[1]
    if(id === users._id && password === users.password){
        return true
    }
    return false
}