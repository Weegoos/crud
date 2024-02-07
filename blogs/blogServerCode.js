const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();


let time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/send-message', async (req, res) => {
    console.log('Получен POST-запрос /blogs/send-message');
    let user_name = req.body.user_name
    console.log(user_name);
    try {
        const blogTextArea = req.body.blogTextArea;
        const headline = req.body.headline
        const user_name = req.body.user_name
        const sql = 'INSERT INTO blogs (id, blogs, headline, length, date_of_publication, user_name) VALUES (?, ?, ?, ?, ?, ?)';
        
        pool.query(sql, [null, blogTextArea, headline, blogTextArea.length, time, user_name], async (err, rows) => {
            if (err) {
                console.error('Error executing INSERT query:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.json({ success: true, message: 'Блог успешно сохранен' });
            }
        });
    } catch (err) {
        // console.log('Ошибка', err);
        res.json({ success: true, message: 'Блог успешно сохранен' });
    }
});

module.exports = router;
