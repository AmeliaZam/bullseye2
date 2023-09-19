import * as XLSX from 'xlsx';

const readXLSXFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      resolve(jsonData);
    };

    reader.onerror = (e) => {
      reject(e.target?.error);
    };

    reader.readAsArrayBuffer(file);
  });
};

export default readXLSXFile;
