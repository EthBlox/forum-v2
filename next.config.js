module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['i.imgur.com', 'www.covalenthq.com', 'logos.covalenthq.com', 'lh3.googleusercontent.com']
    },
    trailingSlash: true,
    exportPathMap: function() {
        return {
            '/': { page: '/' }
        };
    }
}