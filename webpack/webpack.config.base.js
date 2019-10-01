const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const externalsNode = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientConfig = {
    target : 'web',
    entry : {
        main : path.resolve(__dirname, '../src/index.js'),
    },
    output:{
        path : path.resolve(__dirname, '../dist'),
        filename: "client-bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',

            }
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  mimetype: 'image/png',
                },
              },
            ],
          },
        {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use:[
                {
                    loader:'gl-loader',
                    options:{
                        url:'Graphql server URL'
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: ['style-loader', {
                  loader: 'css-loader',
                  options: {
                  modules: true
              }
            }, 'postcss-loader', 'less-loader']
        },
        {
            test: /\.scss$/,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              }, {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: `./postcss.config.js` } }
              }, {
                loader: 'sass-loader',
                options: { sourceMap: true }
              }
            ]
          },
        {
            test:/\.css$/,
            use:[
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                },{
                    loader: 'postcss-loader',
                    options:{sourceMap: true, config:{ path :'./postcss.config.js' }}
                }
            ]  
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        },
        ]
    },
    
    plugins: [
        new MiniCssExtractPlugin({
            filename:'css/index.css'
        }),
        new HtmlWebpackPlugin({
            title: '', 
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
           
        }),
        
  ],

    devServer: { 
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost', 
        compress: true,
        port: 3000,
        open: true,
    }
}

const serverConfig = {
    target : 'node',
    entry : {
        server : path.resolve(__dirname, '../server/app.js')
    },
    output:{
        path: path.resolve(__dirname, '../dist'),
        filename: "server-bundle.js"
    },
    externals : [externalsNode()],

    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',

            }
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
        },
        {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use:[
                {
                    loader:'gl-loader',
                    options:{
                        url:'Graphql server URL'
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: ['style-loader', {
                  loader: 'css-loader',
                  options: {
                  modules: true
              }
            }, 'postcss-loader', 'less-loader']
        },
        {
            test:/\.css$/,
            use:["css-loader"]  
        },
        {
            test: /\.(sa|sc|)$/,
            use: [
                { loader: "style-loader" },
                { loader: "sass-loader"}
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '', 
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
           
        })
  ],
    
}

module.exports = {clientConfig, serverConfig};
