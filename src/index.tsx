import React from "react";
import ReactDOM from "react-dom/client";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de sites',
          type: 'deposit',
          category: 'Dev',
          amount: 5000,
          createdAt: new Date('2022-11-05 00:00:00')
        },
        {
          id: 2,
          title: 'compra de jogo',
          type: 'withdraw',
          category: 'jogo',
          amount: -400,
          createdAt: new Date('2022-11-03 09:00:00')
        },
      ]
    })
  },

  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data);
    })
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
