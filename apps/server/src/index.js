const express = require('express');
const app = express();
const mainRoutes = require('./router/v1/main.routes');
const PORT = process.env.PORT || 3000;

app.use('/api', mainRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});