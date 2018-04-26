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
                                     p.mname middleName, p.balance, s.name school, p.tin_school
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

router.get('/person/view/:account', (req, res) => {
    const account = req.params.account || null;

    try {
        if (account) {
            connection.query(`SELECT p.lname lastName, p.fname firstName, p.mname middleName, s.name schoolName, p.person_account account, p.balance, p.parent_id pId
                              FROM person p
                              INNER JOIN school s ON p.tin_school = s.tin
                              WHERE p.person_account='${account}'`,
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

router.get('/parent/find/:id', (req, res) => {
    const id = req.params.id || null;

    try {
        if (id) {
            connection.query(`SELECT p.fio
                              FROM parent p
                              WHERE p.parent_id='${id}'`,
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

router.get('/persons/list', (req, res) => {
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

router.delete('/persons/delete/:account', (req, res) => {
    const account = req.params.account || null;

    try {
        if (account) {
            connection.query(`DELETE FROM person
                              WHERE person_account='${account}'`,
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

router.get('/schools/list', (req, res) => {
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

router.get('/schools/view/:tin', (req, res) => {
    const tin = req.params.tin || null;

    try {
        if (tin) {
            connection.query(`SELECT s.tin, s.name schoolName, t.name typeSchool, 
                              (SELECT COUNT(*) FROM person p WHERE p.tin_school = s.tin) countPerson
                              FROM school s
                              INNER JOIN school_type t ON s.type_code = t.type_code
                              WHERE s.tin='${tin}';`,
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

router.get('/lease/view/:tin', (req, res) => {
    const tin = req.params.tin || null;

    try {
        if (tin) {
            connection.query(`SELECT l.contract_id contractId, l.create_date dateConclusion, 'действующий' status
                              FROM school s
                              INNER JOIN lease_contract l ON l.contract_id = s.contract_id
                              WHERE s.tin='${tin}';`,
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

router.get('/contracts/list', (req, res) => {
    try {
        connection.query(`SELECT c.contract_number contractId, parent.fio fioParent, CONCAT(person.lname, ' ', person.fname) fioPerson,
                          c.create_date dateCreate, c.signing_date dateSigning, s.name status
                          FROM contract_parent c
                          INNER JOIN parent ON parent.parent_id = c.parent_id
                          INNER JOIN person ON c.contract_number = person.person_account
                          INNER JOIN contract_status s ON s.status_code = c.status_code`,
        (error, results) => {
            if (error) throw error;

            respond(req, res, results);
        });
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/menus/list/:tin', (req, res) => {
    const tin = req.params.tin || null;
    try {
        if (tin) {
            connection.query(`SELECT DISTINCT m.use_date, m.menu_id
                              FROM menu m
                              WHERE m.tin_school='${tin}'`,
            (error, results) => {
                if (error) throw error;

                respond(req, res, results);
            });
        }
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/menus/list', (req, res) => {
    try {
        connection.query(`SELECT m.menu_id id, m.use_date date, m.create_date dateCreate, t.name menuType, 
                          s.name schoolName, r.fio createResp
                          FROM menu m
                          INNER JOIN menu_type t ON m.type_code = t.type_code
                          INNER JOIN school s ON m.tin_school = s.tin
                          INNER JOIN responsible r ON m.responsible_pn = r.personnel_number
                          ORDER BY m.use_date DESC, m.create_date, m.type_code`,
        (error, results) => {
            if (error) throw error;

            respond(req, res, results);
        });
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/menus/view/:id', (req, res) => {
    const id = req.params.id || null;

    try {
        if (id) {
            connection.query(`SELECT m.menu_id menuId, m.create_date dateCreate, m.use_date date,
                              s.name schoolName, mt.name menuType, r.fio createResp
                              FROM menu m
                              INNER JOIN menu_type mt ON mt.type_code = m.type_code
                              INNER JOIN responsible r ON r.personnel_number = m.responsible_pn
                              INNER JOIN school s ON s.tin = m.tin_school
                              WHERE m.menu_id='${id}';`,
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

router.delete('/menus/delete/:id', (req, res) => {
    const id = req.params.id || null;

    try {
        if (id) {
            connection.query(`DELETE FROM menu
                              WHERE menu_id='${id}'`,
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

router.get('/dishes/list/:menu', (req, res) => {
    const menu = req.params.menu || null;

    try {
        connection.query(`SELECT d.name as dish, d.weight, d.proteins, d.fats, d.carb, d.kcal
                          FROM menu m
                          INNER JOIN menu_dishes md ON m.menu_id = md.menu_id
                          INNER JOIN dish d ON md.dish_id = d.dish_id
                          WHERE m.menu_id='${menu}';`,
        (error, results) => {
            if (error) throw error;

            respond(req, res, results);
        });
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.get('/dishes/list', (req, res) => {
    try {
        connection.query(`SELECT d.name, d.weight, d.proteins, d.fats, d.carb, d.kcal
                          FROM dish d
                          ORDER BY d.dish_id DESC`,
        (error, results) => {
            if (error) throw error;

            respond(req, res, results);
        });
    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    }
});

router.post('/admin/login', (req, res) => {
    const login = req.body.login.trim();
    const password = md5(req.body.password.trim());
    
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