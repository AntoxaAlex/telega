const {createLogger,format,transports} = require("winston")
const {timestamp,printf,combine,colorize,errors} = format
const path = require("path")

const myFormat = printf(({timestamp,message})=>{
    return `${timestamp}\n${message}`
})

const options = {
    file:{
        filename: `${path.join(__dirname,"../../logs/logs.log")}`,
        level: "debug",
        handleExceptions: true,
        format:combine(
            timestamp({format:"DD-MM-YYYY HH:mm:ss"}),
            errors({stack:true}),
            myFormat
        ),
        colorize: true
    },
    // console:{
    //     level: "debug",
    //     handleExceptions: true,
    //     format:combine(
    //         timestamp({format:"YYYY-MM-DD HH:mm:ss"}),
    //         errors({stack:true}),
    //         myFormat
    //     ),
    //     colorize: true
    // }
}

const logger = createLogger({
    exitOnError:false,
    transports:[
        new transports.File(options.file),
        // new transports.Console(options.console)
    ]
})

module.exports = logger