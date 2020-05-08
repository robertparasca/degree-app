const path = require('path');

module.exports = {
    webpack: function (config, env) {
        return {
            ...config,
            resolve: {
                alias: {
                    'app-components': path.resolve(__dirname, 'src/components/'),
                    'app-layout': path.resolve(__dirname, 'src/layout/'),
                    'app-pages': path.resolve(__dirname, 'src/pages/'),
                    'app-redux': path.resolve(__dirname, 'src/redux/'),
                    'app-reducers': path.resolve(__dirname, 'src/redux/reducers/'),
                    'app-utils': path.resolve(__dirname, 'src/utils/')
                }
            }
        };
    }
};
