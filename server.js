const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
const { request, response } = require("express");
app.use(express.json());
app.use(cors());

let userDataBase = [];
let debitDataBase = [];
let incomeDataBase = [];
let expenseDataBase = [];
let taxiParkDataBase = [];
let invoiceDataBase = [];
const refreshTokens = [];
let currentNetIncome = 0;



function calculateTotal(dataArray) {
  return dataArray.reduce((total, entry) => Number(total) + Number(entry.amount), 0);
}





// ?================================NET================================


app.get("/net", (request, response) => {
  const totalIncome = calculateTotal(incomeDataBase);
  const totalExpense = calculateTotal(expenseDataBase);

  currentNetIncome = Number(totalIncome) - Number(totalExpense);
  
  response.status(200).send({
    success: "OK",
    message: "Net income calculated successfully",
    netIncome: currentNetIncome,
  });
});

// !================================totalDebt================================


app.get("/totalDebt", (request, response) => {
  const totalDebts = calculateTotal(debitDataBase);  
  response.status(200).send({
    success: "OK",
    message: "Net income calculated successfully",
    totalDebts: totalDebts,
  });
});



// ?+++++++++++++++++++++++


app.post("/login", (req, res) => {
  console.log(req.body);
  if (req.body.userName === "Farid" && req.body.password === "password") {
    const refreshToken = "jkfhjksdhsfkhfkshdkfkdfajksgfksgfkasdgjkfbgdjkscfbjksdbcjk"
    
    refreshTokens.push({
      token: refreshToken,
      expiresIn: new Date(Date.now() + 1 * 10 * 1000)
    });

    res.status(200).send({
      message: "Daxil olma uğurlu oldu",
      data: {
        refreshToken: refreshToken
      }
    });
  } else {
    res.status(401).send({
      message: "İstifadəçi tapılmadı",
    });
  }
});

app.post("/refresh", (req, res) => {
  // const refreshToken = req.body.refreshToken;
console.log("refreshToken", req.body);
if (req.body.refreshToken === refreshTokens.token) {
  res.status(200).send({
    message: "Refresh uğurla başa çatdı",
    data: {
      type: true,
    }
  });
} 

});


// app.post("/login", (req, res) => {
//   console.log(req.body);
//   if (req.body.userName === "Farid" && req.body.password == "password") {
//     res.status(200).send({
//       status: 200,
//       message: "login successful",
//       data: {
//         token: "klhclhsdkcfhkkfhakshdahskfhasjvgdjhvgdcfgsdghkjdhckdhckjah"
//       }
//     })
//   } else {
//     res.status(401).send({
//       status: 401,
//       message: "user not found",
//     })
//   }
// });



app.get("/get-data", (request, response) => {
  response.status(200).send({
    success: "OK",
    message: "Successful receipt of the date",
    data: userDataBase,
  });
});





app.get("/get-data/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ line 19 ~ app.get:id ~ userDataBase", userDataBase);
  const id = request.params.id;
  let userItem = userDataBase.findIndex((user) => user.id === Number(id));
  response.status(200).send({
    success: "OK",
    message: "Successful receipt of the date",
    data: userDataBase[userItem],
  });
  // console.log("bura bax ------------",userDataBase[userItem])
});


app.post("/create-data", (request, response) => {
  userDataBase.push(request.body);
  console.log(
    "🚀 ~ file: server.js ~ line 34 ~ app.post ~ request.body",
    request.body
  );
  response.status(200).send({
    success: "OK",
    message: "Successful date creation",
  });
});

app.put("/update-data/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ line 44 ~ app.put ~ request.body", request.body);
  const id = request.params.id;
  let userItem = userDataBase.findIndex((user) => user.id === Number(id));
  userDataBase.splice(userItem, 1, request.body);
  response.status(200).send({
    success: "OK",
    message: "Successful date update",
  });
});


app.delete("/delete-data/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ line 56 ~ app.delete ~ request.params", request.params);
  const id1 = request.params.id;
  let userItem = userDataBase.findIndex((user) => user.id === Number(id1));
  userDataBase.splice(userItem, 1);
  response.status(200).send({
    success: "OK",
    message: "Successful date Delete",
  });

});



// ?====================================Expense==================

app.get("/expense", (request, response) => {
  response.status(200).send({
    success: "OK",
    message: "Successful receipt of the date",
    data: expenseDataBase,
  });
});

app.post("/expense", (request, response) => {
  expenseDataBase.push(request.body);
  console.log(
    "🚀 ~ file: server.js ~ Expense ~ app.post ~ request.body",
    request.body
  );
  response.status(200).send({
    success: "OK",
    message: "Successful date creation",
  });
});

app.put("/expense/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ Expense ~ app.put ~ request.body", request.body);
  const id = request.params.id;
  let userItem = expenseDataBase.findIndex((user) => user.id === Number(id));
  expenseDataBase.splice(userItem, 1, request.body);
  response.status(200).send({
    success: "OK",
    message: "Successful date update",
  });
});


app.delete("/expense/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ Expense ~ app.delete ~ request.params.id", Number(request.params.id));
  const id1 = request.params.id;
  let userItem = expenseDataBase.findIndex((user) => user.id === Number(id1));
  expenseDataBase.splice(userItem, 1);
  response.status(200).send({
    success: "OK",
    message: "Successful date Delete",
  });

});

// *===============================İNCOMES=================================

// app.get("/net", (request, response) => {
//   let incomeAmount = incomeDataBase
//   console.log(incomeAmount);
//   response.status(200).send({
//     success: "OK",
//     message: "Successful receipt of the date",
//     data: incomeDataBase,
//   });
// });


app.get("/income", (request, response) => {
  response.status(200).send({
    success: "OK",
    message: "Successful receipt of the date",
    data: incomeDataBase,
  });
});

app.post("/income", (request, response) => {
  incomeDataBase.push(request.body);
  console.log(
    "🚀 ~ file: server.js ~ income ~ app.post ~ request.body",
    request.body
  );
  response.status(200).send({
    success: "OK",
    message: "Successful date creation",
  });
});

app.put("/income/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ income ~ app.put ~ request.body", request.body);
  const id = request.params.id;
  let userItem = incomeDataBase.findIndex((user) => user.id === Number(id));
  incomeDataBase.splice(userItem, 1, request.body);
  response.status(200).send({
    success: "OK",
    message: "Successful date update",
  });
});


app.delete("/income/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ income ~ app.delete ~ request.params.id", Number(request.params.id));
  const id1 = request.params.id;
  let userItem = incomeDataBase.findIndex((user) => user.id === Number(id1));
  incomeDataBase.splice(userItem, 1);
  response.status(200).send({
    success: "OK",
    message: "Successful date Delete",
  });

});


// !================================DEBTS================================

app.get("/debt", (request, response) => {
  response.status(200).send({
    success: "OK",
    message: "Successful receipt of the date",
    data: debitDataBase,
  });
});

app.post("/debt", (request, response) => {
  debitDataBase.push(request.body);
  console.log(
    "🚀 ~ file: server.js ~ debt ~ app.post ~ request.body",
    request.body
  );
  response.status(200).send({
    success: "OK",
    message: "Successful date creation",
  });
});

app.put("/debt/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ debt ~ app.put ~ request.body", request.body);
  const id = request.params.id;
  let userItem = debitDataBase.findIndex((user) => user.id === Number(id));
  debitDataBase.splice(userItem, 1, request.body);
  response.status(200).send({
    success: "OK",
    message: "Successful date update",
  });
});


app.delete("/debt/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ debt ~ app.delete ~ id", Number(request.params.id));
  const id1 = request.params.id;
  let userItem = debitDataBase.findIndex((user) => user.id === Number(id1));
  debitDataBase.splice(userItem, 1);
  response.status(200).send({
    success: "OK",
    message: "Successful date Delete",
  });

});


// * ================================TaxiPark================================
app.get("/taxiPark", (request, response) => {
  response.status(200).send({
    success: "OK",
    message: "Successful receipt of the date",
    data: taxiParkDataBase,
  });
});

app.post("/taxiPark", (request, response) => {
  taxiParkDataBase.push(request.body);
  console.log(
    "🚀 ~ file: server.js ~ TaxiPark ~ app.post ~ request.body",
    request.body
  );
  response.status(200).send({
    success: "OK",
    message: "Successful date creation",
  });
});

app.put("/taxiPark/:id", (request, response) => {
  console.log(
    "🚀 ~ file: server.js ~ TaxiPark ~ app.put ~ request.body",
    request.body
  );
  const id = request.params.id;
  let userItem = taxiParkDataBase.findIndex((user) => user.id === id);
  taxiParkDataBase.splice(userItem, 1, request.body);
  response.status(200).send({
    success: "OK",
    message: "Successful date update",
  });
});

app.delete("/taxiPark/:id", (request, response) => {
  console.log(
    "🚀 ~ file: server.js ~ TaxiPark ~ app.delete ~ request.params.id",
    request.params.id
  );
  const id1 = request.params.id;
  let userItem = taxiParkDataBase.findIndex((user) => user.id === Number(id1));
  taxiParkDataBase.splice(userItem, 1);
  response.status(200).send({
    success: "OK",
    message: "Successful date Delete",
  });
});



// ?====================================e-invoice==================

app.get("/get-data/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ line 19 ~ app.get:id ~ userDataBase", invoiceDataBase);
  const id = request.params.id;
  let userItem = invoiceDataBase.findIndex((user) => user.id === Number(id));
  response.status(200).send({
    success: "OK",
    message: "Successful receipt of the date",
    data: invoiceDataBase[userItem],
  });
  // console.log("bura bax ------------",userDataBase[userItem])
});


app.get("/e-invoice", (request, response) => {
  response.status(200).send({
    success: "OK",
    message: "Successful receipt of the date",
    data: invoiceDataBase,
  });
});

app.post("/e-invoice/create", (request, response) => {
  invoiceDataBase.push(request.body);
  console.log(
    "🚀 ~ file: server.js ~ Expense ~ app.post ~ request.body",
    request.body
  );
  response.status(200).send({
    success: "OK",
    message: "Successful date creation",
  });
});

app.put("/e-invoice/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ Expense ~ app.put ~ request.body", request.body);
  const id = request.params.id;
  let userItem = invoiceDataBase.findIndex((user) => user.id === Number(id));
  invoiceDataBase.splice(userItem, 1, request.body);
  response.status(200).send({
    success: "OK",
    message: "Successful date update",
  });
});


app.delete("/e-invoice/:id", (request, response) => {
  console.log("🚀 ~ file: server.js ~ Expense ~ app.delete ~ request.params.id", Number(request.params.id));
  const id1 = request.params.id;
  let userItem = invoiceDataBase.findIndex((user) => user.id === Number(id1));
  invoiceDataBase.splice(userItem, 1);
  response.status(200).send({
    success: "OK",
    message: "Successful date Delete",
  });

});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Start server on  http://localhost:${PORT} !`);
});
