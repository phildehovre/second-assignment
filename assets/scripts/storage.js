// function buildData() {
//     let userData = [];
//     let headers = Array.from(document.querySelectorAll('th')).map(header => header.innerText.toLowerCase());

//     let rows = Array.from(document.querySelectorAll('tr')).slice(1); // Exclude header row
//     userData = rows.map(row => {
//         let cells = Array.from(row.querySelectorAll('td')).map(td => td.innerText);
//         let userObject = {};
//         headers.forEach((header, i) => {
//             userObject[header] = cells[i] || ''; // Handle cases where cells might be undefined
//         });
//         return userObject;
//     });
//     console.log(userData)
//     return userData;
// }

// let data = buildData();

// let books = [
//     {
//         title: "The Girl With the Dragon Tattoo",
//         author: "Stieg Larsson",
//         published: 2005
//     },
//     {
//         title: "Harry Potter and the Goblet of Fire",
//         author: "JK Rowling",
//         published: 2000
//     },
//     {
//         title: "Thinking, Fast and Slow",
//         author: "Daniel Kahneman",
//         published: 2011
//     },
//     {
//         title: "Days Without End",
//         author: "Sebastian Barry",
//         published: 2016
//     },
//     {
//         title: "The Silence of the Girls",
//         author: "Pat Barker",
//         published: 2018
//     },
// ];


// function buildTable(data) {
    
//     let headings = Object.keys(data[0]);
//     let tableBodyString = ''
//     let headingsString = ''
    
//     for (let book of books) {
//         tableBodyString += `<tr>
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <td>${book.published}</td>
//         </tr>`
//     }
    
//     for (let heading of headings) {
//         headingsString += `<th>${heading}</th>`
//     }
    
//     let table = `<table>
//     <thead><tr>${headingsString}</tr></thead>
//     <tbody>${tableBodyString}</tbody>
//     </table>
//     `
//     return table
// }
    
//     let table = buildTable(books);
//     console.log(table)
//     document.getElementById("data-table").innerHTML = table;
//     // Write your code here
    