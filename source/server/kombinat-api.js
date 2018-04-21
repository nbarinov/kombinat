import { Router } from 'express';
import mysql from 'mysql';
import { dbConfig } from '../config';

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
                              WHERE person_account='${account}' ORDER BY rate_id`,
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
            connection.query(`SELECT bank, date_commission dateCommission, sum
                              FROM payment
                              WHERE person_account='${account}' ORDER BY payment_id`,
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
        connection.query(`select p.lname lastName, p.fname firstName, p.mname middleName, s.name schoolName, p.balance 
                         from person p
                         inner join school s on p.tin_school = s.tin`, 
        (error, results) => {
            if (error) throw error;

            respond(req, res, results);
        });
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

export default router;