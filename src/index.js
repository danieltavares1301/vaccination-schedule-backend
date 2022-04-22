const dotenv = require('dotenv');
const app = require('./Server.js');

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
