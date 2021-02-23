const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const stage_1_upload = require('./routes/api/stage1_upload');
const stage_2_upload = require('./routes/api/stage2_upload');

app.use('/stage1', stage_1_upload);
app.use('/stage2', stage_2_upload);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

