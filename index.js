const XLSX = require('xlsx');

function createSqlFile(path, fieldsType){
    const file = XLSX.readFile(path)

    let data = []

    const sheets = file.SheetNames

    for(let i = 0; i < sheets.length; i++) {
        const temp = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
    }

    const column = Object.keys(fieldsType);
    const columnwithOptions = Object.values(fieldsType)

    var fs = require('fs');

    fs.writeFile(`${file.Props.SheetNames}.sql`,`
    DROP TABLE IF EXISTS \`${file.Props.SheetNames}\`;
    CREATE TABLE IF NOT EXISTS \`${file.Props.SheetNames}\` (
        ${
            column.map((data, index) => { return data + ' ' + columnwithOptions[index] })
        }
    ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    ${       
        data.map((data) => {
            return `
                INSERT INTO \`${file.Props.SheetNames}\` (${column.map((data)=>{return '`' + `${data}`.replace(' ','_') + '`'})}) VALUES
                (${Object.values(data).map((data)=>{ return typeof data === 'string' ? (`'` + data + `'`) : (data)})});
                COMMIT;
                `
        }).join('')
    }        

    `, function(err){
        if(err) throw err;
        console.log('File is created successfully');
    })
}

module.exports = createSqlFile;


