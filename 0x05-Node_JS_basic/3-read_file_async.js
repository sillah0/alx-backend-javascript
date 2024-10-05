const fs = require('fs');

function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (data) {
        const result = data.split(/,|\n/);
        const fields = {};

        for (let i = 7; i < result.length; i += 4) {
          const field = result[i];
          const student = result[i - 3];

          if (field in fields) {
            fields[field].push(student);
          } else {
            fields[field] = [student];
          }
        }

        const studentsNumber = (result.length - 5) / 4;
        console.log(`Number of students: ${studentsNumber}`);
        for (const [field, students] of Object.entries(fields)) {
          console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
        }
        resolve({ fields, studentsNumber });
      } else reject(reject(new Error('Cannot load the database')));
    });
  });
}

module.exports = countStudents;
