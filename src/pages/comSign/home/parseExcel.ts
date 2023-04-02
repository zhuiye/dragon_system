import * as xlsx from 'xlsx';

interface Person {
  name: string;
  age: number;
  avatar: string;
  occupation: string;
  id: string;
  phone: string;
}

function parseExcel(file: File): Promise<Person[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const data = event.target?.result;
      if (typeof data === 'string') {
        const workbook = xlsx.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet);
        const people = rows.map((row: any) => ({
          name: row['姓名'],
          age: parseInt(row['年龄']),
          avatar: row['头像'],
          occupation: row['职业'],
          id: row['身份证号码'],
          phone: row['手机号码'],
        }));
        resolve(people);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsBinaryString(file);
  });
}

export default parseExcel;
