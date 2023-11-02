const fs = require('fs');
const PDFDocument = require('pdfkit');

const data = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
];

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('output.pdf'));

doc.fontSize(18);
doc.text('List of Users', { align: 'center' });
doc.moveDown(0.5);

data.forEach((item) => {
  doc.fontSize(14);
  doc.text(`Name: ${item.name}`);
  doc.text(`Age: ${item.age}`);
  doc.moveDown(0.5);
});

doc.end();
