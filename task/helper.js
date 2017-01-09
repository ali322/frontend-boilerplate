function bundleTime(){
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    const hour = dateObj.getHours()
    const minute = dateObj.getMinutes()
    return ""+year+month+date+hour+minute
}

module.exports = {
    bundleTime:bundleTime
}