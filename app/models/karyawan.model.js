const sql = require("./db.js");

// constructor
const Karyawan = function(karyawan) {
    this.emp_no = karyawan.emp_no;
    this.birth_date = karyawan.birth_date;
    this.first_name = karyawan.first_name;
    this.last_name = karyawan.last_name;
    this.gender = karyawan.gender;
    this.hire_date = karyawan.hire_date;
};

Karyawan.create = (newKaryawan, result) => {
    sql.query("INSERT INTO employees SET ?", newKaryawan, (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(err, null);
            return;
        }
        // console.log("created karyawan: ", { ...newKaryawan });
        result(null, { ...newKaryawan });
    });
};

Karyawan.getAll = (emp_no, result) => {
    let query = "SELECT employees.*, MAX(salaries.salary) AS salary, departments.dept_name, titles.title FROM employees LEFT JOIN salaries ON employees.emp_no = salaries.emp_no LEFT JOIN dept_emp ON employees.emp_no = dept_emp.emp_no LEFT JOIN titles ON employees.emp_no = titles.emp_no LEFT JOIN departments ON dept_emp.dept_no = departments.dept_no";
    if (emp_no) {
        query += ` WHERE employees.emp_no = ${emp_no}`;
    }

    query += " GROUP BY employees.emp_no LIMIT 1000;"
    sql.query(query, (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length == 0) {
            // console.log("ID Not Found");
            result({ kind: "not_found" }, null);
            return;
        }
        // console.log("employees: ", res);
        result(null, res);
    });
};

Karyawan.updateById = (emp_no, karyawan, result) => {
    sql.query(
        "Update employees SET birth_date = ?, first_name = ?, last_name = ?, gender = ?, hire_date = ? WHERE emp_no = ?",
        [karyawan.birth_date, karyawan.first_name, karyawan.last_name, karyawan.gender, karyawan.hire_date, emp_no],
        (err, res) => {
            if (err) {
                // console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                //not found Karyawan with the id
                result({ kind: "not_found" }, null);
                return;
            }
            // console.log("updated karyawan: ", { ...karyawan });
            result(null, { ...karyawan });
        }
    );
};

Karyawan.remove = (emp_no, result) => {
    sql.query("DELETE FROM employees WHERE emp_no = ?", emp_no, (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            //not found Karyawan with the id
            result({ kind: "not_found" }, null);
            return;
        }
        // console.log("deleted karyawan with emp_no: ", emp_no);
        result(null, res);
    });
};

module.exports = Karyawan;