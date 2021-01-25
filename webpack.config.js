const path = require('path');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js'
    },
    devServer:{
        publicPath:'/vritual/',
        contentBase:path.resolve(__dirname,'public'),
        port:8080
    }
}