import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  let dateObj;
  if(!date){
    dateObj = {
      unix: Date.now(),
      utc: new Date().toUTCString()
    }
    res.json(dateObj)
  }else{
    let unixRegex = /^\d+$/;
    if(unixRegex.test(date)){
      dateObj = {
        unix: parseInt(date),
        utc: new Date(parseInt(date)).toUTCString()
      }
    }else{
      const parsedDate = new Date(date);
      if(parsedDate.toString() === "Invalid Date"){
        res.json({ error: "Invalid Date" });
        return;
      }
      dateObj = {
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
      }
    }
  }
  res.json(dateObj)
})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
