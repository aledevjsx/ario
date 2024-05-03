import express from 'express';
import bodyParser from 'body-parser';
import sql from 'mssql';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



const config = {
    user: 'administrador',
    password: 'admin#1234',
    server: 'zapatosserver.database.windows.net', 
    database: 'Base_Datos_Zapatos',
};

sql.connect(config).then(() => {
    console.log('Connected to SQL Server successfully');
}).catch(err => {
    console.error('SQL Server connection error: ', err);
});

app.post('/register', async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        console.log( username, password);

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('input_username', sql.NVarChar, username)
            .input('input_password', sql.NVarChar, password)
            .query(`INSERT INTO usuario (usuario, pass) VALUES (@input_username, @input_password)`);

        sql.close();

        res.send('User registered successfully');
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('An error occurred during the registration');
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});