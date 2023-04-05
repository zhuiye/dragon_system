import * as xlsx from 'xlsx';

interface Person {
  player_name: string;
  gender: number;
  phone_number: string;
  age: number;
  identify_number: string;
  post_id: number;
  image_url: string;
  is_register_success: number;
  nationality: string;
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
          player_name: row['姓名'],
          gender: row['性别'],
          age: parseInt(row['年龄']),
          image_url: row['头像地址'],
          identify_number: row['身份证号码'],
          phone_number: row['手机号码'],
          nationality: row['民族'],
        }));
        resolve(people as any);
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
