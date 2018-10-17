const path = require('path');

module.exports = {
    entry: './src/Main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
               /* options: {
                    "presets": [
                        ['es2015', {modules: false}]
                    ],
                },*/
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      /*  alias: {
            ytj: srcPath('ytj/src/index'),
        },*/
       /* alias: {
            '@': resolve('src')    //<== 这里，具体可以看resolve方法内部 @符合就代表了 磁盘中src的绝对路径
        }*/
    },
    output: {
        filename: 'hi.js',
        library: 'Hi',
        path: path.resolve(__dirname, 'dist')
    }
};