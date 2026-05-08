const fs = require('fs');
const code = fs.readFileSync('script.js', 'utf-8');
try {
  new Function(code);
  console.log("No syntax errors.");
} catch(e) {
  console.error("Syntax Error:", e);
}
