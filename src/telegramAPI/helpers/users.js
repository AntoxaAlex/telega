if(process.env.NODE_ENV !== "production"){
        require("dotenv").config()
}
module.exports = {
        _id:process.env.USER1_ID,
        first_name:process.env.USER1_FIRSTNAME,
        last_name:process.env.USER1_LASTNAME,
        username:process.env.USER1_USERNAME,
        password:process.env.USER1_PASSWORD
    }