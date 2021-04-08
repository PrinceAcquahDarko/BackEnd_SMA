let express = require('express');
let cors = require('cors')
let app = express();

let connection = require('./db/db.config')

connection.connect()


let loginRouter = require('./routes/loginRoutes');
let registerRouter = require('./routes/registerRoutes');
let adminRouter = require('./routes/adminRoutes');
let studentsRouter = require('./routes/studentsRoutes');
let feedbackRouter = require('./routes/feedbackRoutes');

app.use(express.json())
app.use(cors())
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/admin', adminRouter);
app.use('/students', studentsRouter);
app.use('/feedback', feedbackRouter);

app.listen(process.env.PORT || 3000)