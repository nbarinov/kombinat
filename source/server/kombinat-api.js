import { Router } from 'express';
import mysql from 'mysql';
import { dbConfig } from '../config';
import md5 from 'md5';

const router = new Router();
const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.log(`error connecting: ${err.stack}`);

        return;
    }

    console.log('connected as id ' + connection.threadId);
});

const respond = (req, res, data) => {
    res.status(200).json(data);
};

router.get('/person/find', (req, res) => {
    const account = decodeURIComponent(req.query.account);
    const lname = decodeURIComponent(req.query.lname);

    try {
        if (account && lname) {
            connection.query(`SELECT p.person_account account, p.lname lastName, p.fname firstName, 
                                     p.mname middleName, p.balance, s.name school 
                              FROM person p
                              INNER JOIN school s ON p.tin_school = s.tin 
                              WHERE p.person_account='${account}' AND p.lname='${lname}'`, 
            (error, results) => {
                if(error) throw error;

                respond(req, res, results);
            });
        }
    } catch(err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/person/rate/:account', (req, res) => {
    const account = req.params.account || null;

    try {
        if(account) {
            connection.query(`SELECT year, month, sum
                              FROM rate
                              WHERE person_account='${account}'
                              ORDER BY rate_id DESC`,
            (error, results) => {
                if(error) throw error;

                return respond(req, res, results);
            });
        }
    } catch(err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/person/payment/:account', (req, res) => {
    const account = req.params.account || null;

    try {
        if (account) {
            connection.query(`SELECT payment_id id, bank, date_commission date, sum
                              FROM payment
                              WHERE person_account='${account}' 
                              ORDER BY payment_id DESC`,
            (error, results) => {
                if (error) throw error;

                return respond(req, res, results);
            });
        }
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/persons', (req, res) => {
    try {
        connection.query(`SELECT p.lname lastName, p.fname firstName, p.mname middleName, s.name schoolName, p.person_account account
                         FROM person p
                         INNER JOIN school s ON p.tin_school = s.tin`, 
        (error, results) => {
            if (error) throw error;

            respond(req, res, results);
        });
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/schools', (req, res) => {
    try {
        connection.query(`SELECT s.tin, s.name schoolName, t.name typeSchool, 
                          (SELECT COUNT(*) FROM person p WHERE p.tin_school = s.tin) countPerson
                          FROM school s
                          INNER JOIN school_type t ON s.type_code = t.type_code`,
        (error, results) => {
            if (error) throw error;

            respond(req, res, results);
        });
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/menus', (req, res) => {
    try {
        connection.query(`SELECT m.use_date date, m.create_date dateCreate, t.name menuType, s.name schoolName, r.fio createResp
                          FROM menu m
                          INNER JOIN menu_type t ON m.type_code = t.type_code
                          INNER JOIN school s ON m.tin_school = s.tin
                          INNER JOIN responsible r ON m.responsible_pn = r.personnel_number
                          ORDER BY m.use_date DESC, m.create_date`,
        (error, results) => {
            if (error) throw error;

            respond(req, res, results);
        });
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/admin/login', (req, res) => {
    const login = decodeURIComponent(req.query.login);
    const password = md5(decodeURIComponent(req.query.password));

    try {
        if (login && password) {
            connection.query(`SELECT login, email, fname, role
                              FROM users
                              WHERE login='${login}' AND password='${password}'`, 
            (error, results) => {
                if(error) throw error;

                respond(req, res, results);
            });
        }
    } catch(err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

export default router;