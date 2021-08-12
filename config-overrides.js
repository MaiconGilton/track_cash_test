const path = require('path');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.alias,
            '@assets': path.resolve(__dirname, 'src/app/assets'),
            '@layout': path.resolve(__dirname, 'src/app/layout'),
            '@styles': path.resolve(__dirname, 'src/app/styles'),
            '@components': path.resolve(__dirname, 'src/app/components'),
            '@utils': path.resolve(__dirname, 'src/app/utils'),
            '@pages': path.resolve(__dirname, 'src/app/pages'),
            '@services': path.resolve(__dirname, 'src/app/services'),
            '@store': path.resolve(__dirname, 'src/app/store'),
        },
    };
    return config;
};