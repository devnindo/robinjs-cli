module.exports = {
    dev: {
        port: 3000
    },
    production: {
        port: 8080
    },
    build: {
        postcss: {
            plugins: {
                autoprefixer: {}

            }
        }
    }
}
