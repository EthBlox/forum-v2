module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['i.imgur.com', 'www.covalenthq.com', 'logos.covalenthq.com', 'lh3.googleusercontent.com'],
        loader: "imgix",
        path: "https://noop/"
    },
    exportPathMap: function() {
        return {
            '/': { page: '/' }
        };
    }
}