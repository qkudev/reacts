import express from "express";

const server = express();

server.get("/", (_, res) => {
  res.send({
    status: true,
    data: "OK",
  });
});

server.listen(8080, () => {
  console.log("server is on 8080");
});
