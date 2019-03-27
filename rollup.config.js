const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const resolve = require('rollup-plugin-node-resolve');

const CJSBuild = {
    input: './src/index.js',
    output: {
        file: './dist/index.min.js',
        format: 'cjs',
        compact: false,
    },
    plugins: [
        babel({
            exclude: './node_modules/**',
        }),
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules',
            },
        }),
        uglify(),
    ],
    external: ['react', 'prop-types'],
};

module.exports = CJSBuild;
