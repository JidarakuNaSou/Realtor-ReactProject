module.exports = {
    PORT: process.env.PORT || 4000,
    mongoURI: process.env.MONGODB_URI || "mongodb://localhost/db",
    jwt: {
        secret: "secret",
        tokens: {
            access:{
                type: "access",
                expiresIn: "2m"
            },
            refresh: {
                type: "refresh",
                expiresIn: "30m"
            }
        }
    }
}