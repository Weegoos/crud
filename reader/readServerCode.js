const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend',
});

connection.connect((err) => {
    if (err) {
        console.error('Ошибка при подключении к базе данных:', err);
        return;
    }
    console.log('Подключение к базе данных backend прошло успешно!');
});

router.use(express.urlencoded({ extended: true }));
const promiseConnection = connection.promise();

router.get('/get-data',  (req, res) => {
    try {
        const sql = "SELECT * FROM blogs";
        connection.query(sql, '',  (err, rows) => {
            if (err) {
                console.error('Error executing SELECT query:', err);
                res.status(500).json({ error: 'Внутренняя ошибка сервера' });
                return;
            }

            const blogs = rows.map(blog => ({ id: blog.id, content: blog.blogs,
                 headline: blog.headline, length: blog.length, timestamp: blog.date_of_publication,
                 author: blog.user_name})).reverse();
            res.json(blogs);
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

router.delete('/delete-blog/:id',  (req, res) => {
    try {
        const blogId = req.params.id;
        const sql = "DELETE FROM `blogs` WHERE blogs.id = ?";
        
        connection.query(sql, [blogId],  (err, result) => {
            if (err) {
                console.error('Error executing DELETE query:', err);
                res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
                return;
            }

            res.json({ success: true, message: 'Блог успешно удален' });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});
router.post('/update-blog', (req, res) => {
    console.log('Получен POST-запрос /update-blog');
    
    try {
        const blogId = req.body.updateDataId;
        const updatedData = req.body.updateDataContent;
        const len = updatedData.length
        // UPDATE `blogs` SET `blogs` = 'fdfdf', `headline` = 'Cha', `length` = '1264' WHERE `blogs`.`id` = 52
        const sql = "UPDATE `blogs` SET `blogs` = ?, length = ? WHERE id = ?";

        connection.query(sql, [updatedData,len, blogId], (err, result) => {
            if (err) {
                console.error('Error executing UPDATE query:', err);
                res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера', error: err.message });
                return;
            }

            res.json({ success: true, message: 'Блог успешно обновлен' });
        });
    } catch (err) {
        
        res.json({ success: true, message: 'Блог успешно обновлен' });
    }
});

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();


let time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
console.log(time);
module.exports = router;

// const sql = "SELECT * from blogs"
// connection.query(sql, '', async (err, rows) => {
//     rows.forEach(blog => {
//         console.log(blog.blogs);
//     });
// })

