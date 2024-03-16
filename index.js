import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.adviceslip.com/advice";

app.use(express.static("public"));
app.use(bodyParser.urlencoded( { extended: true } ));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/advice", async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        res.render("index.ejs", { advice: result.data.slip.advice })
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})