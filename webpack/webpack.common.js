const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const distPath = path.join(__dirname, '../dist');
const entryPath = path.resolve(__dirname, '../index.js')

module.exports = {
    entry: entryPath,
    output: {
    path: distPath,
    filename: 'index.bundle.js'
    },
   
    module: {
    rules: [
        {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
            loader: 'babel-loader'
        }
        },{
            test: /\.svg$/,
            oneOf: [
                {
                  use: [
                    {
                      loader: '@svgr/webpack',
                      options: {
                        prettier: false,
                        svgo: true,
                        svgoConfig: {
                          plugins: [{removeViewBox: false}],
                        },
                        titleProp: true,
                      },
                    },
                  ],
                  issuer: {
                    and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                  },
                },
            ],
        },
        {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
        }
    ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
}