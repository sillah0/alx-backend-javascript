const fs = require('fs');

function countStudents(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
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

    const studentsCount = (result.length - 5) / 4;
    console.log(`Number of students: ${studentsCount}`);
    for (const [field, students] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
