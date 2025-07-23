import express from "express";
import { readings } from "./readings/readings";
import { readingsData } from "./readings/readings.data";
import { read, store } from "./readings/readings-controller";
import { recommend, compare } from "./price-plans/price-plans-controller";
import { Data } from "./types/type";

const app = express();
app.use(express.json());

const { getReadings, setReadings } = readings(readingsData as Data);

app.get("/readings/read/:smartMeterId", (req, res) => {
  res.send(read(getReadings, req));
});

app.post("/readings/store", (req, res) => {
  res.send(store(setReadings, req));
});

app.get("/price-plans/recommend/:smartMeterId", (req, res) => {
  res.send(recommend(getReadings, req));
});

app.get("/price-plans/compare-all/:smartMeterId", (req, res) => {
  res.send(compare(getReadings, req));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`🚀 app listening on port ${port}`);
