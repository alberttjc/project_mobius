const path = require('path');

module.exports = {
    //outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/stage1': {
                target: 'http://localhost:3000'
            },

            '/stage2': {
                target: 'http://localhost:3000'
            }
        }
    }
}