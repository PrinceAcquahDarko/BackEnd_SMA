let express = require('express');
let cors = require('cors')
let app = express();
let connect = require('./db/dbConfig')

let loginRouter = require('./routes/loginRoutes');
let registerRouter = require('./routes/registerRoutes');
let adminRouter = require('./routes/adminRoutes');
let studentsRouter = require('./routes/studentsRoutes');
let feedbackRouter = require('./routes/feedbackRoutes');

app.use(express.json())
app.use(cors())
app.use('/login', loginRouter(connect));
app.use('/register', registerRouter(connect));
app.use('/admin', adminRouter(connect));
app.use('/students', studentsRouter(connect));
app.use('/feedback', feedbackRouter(connect));

app.listen(process.env.PORT || 3000)