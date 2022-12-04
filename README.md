# transformExelToSql
A biblioteca transformExelToSql é uma biblioteca que tranforma sua planilha exel em um arquivo sql pronto para importação, em outras palavras, tranforma sua planilha em uma tabela no seu banco de dados.

## Instalação
 
npm i transformexeltosql

## Requisitos
XLSX Package (npm install xlsx)

## Como usar

Primeiro importe o package, e chame a função createSqlFile, que recebe o caminho da sua planilha como primeiro parâmetro, e como
segundo parâmetro, passe os valores exatos das colunas de sua planilha, juntamente com as propriedades que elas devem ter.

```node
const createSqlFile = require('transformexeltosql');

createSqlFile('./test.xlsx', {
  Nome: "varchar(255) NOT NULL",
  Sobrenome: "varchar(255) NOT NULL",
  idade: "int DEFAULT NULL",
  id: "int PRIMARY KEY",
  'Último nome': "varchar(255) NOT NULL"
 }
);

```
