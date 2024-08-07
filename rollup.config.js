const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
//const { uglify } = require('rollup-plugin-uglify');

const CJSBuild = {
    input: './src/index.js',
    output: {
        file: './dist/index.min.js',
        sourcemap: 'inline',
        format: 'cjs',
        compact: true,
    },
    plugins: [
        babel({
            exclude: './node_modules/**',
            babelHelpers: 'bundled'
        }),
        resolve({
            customResolveOptions: {
                moduleDirectories: ['node_modules'],
            },
        }),
      //  uglify(),
    ],
    external: ['react', 'prop-types', 'object-assign'],
};

module.exports = CJSBuild;
