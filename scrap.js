// axios: To fetch or Http request
// cheerio: to parse Html
// fs: for file reading/writing

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://news.ycombinator.com/";
function scrapDetails() {
  try {
    const response = axios.get(url).then((response) => {
      const html = response.data;
      const cheerioInstance = cheerio.load(html);

      const data = {
        "0-100": [],
        "101-200": [],
        "201-300": [],
        "301-n": [],
      };

      cheerioInstance(".athing").each((index, element) => {
        //   const title = $(element).find(".title .storylink").text();
        // console.log(title);
        const title = cheerioInstance(element).find(".title a").text().trim();
        //   const link = $(element).find(".title .storylink").attr("href");
        const link = cheerioInstance(element).find(".title a").attr("href");
        // console.log(link);
        const subtext = cheerioInstance(element).next().find(".subtext");
        const commentsText = subtext.find("a").last().text();
        let comments = 0;

        if (commentsText.includes("comment")) {
          comments = parseInt(commentsText.split(" ")[0]);
          console.log(comments);
        }

        const newsItem = {
          title,
          link,
          comments,
        };

        if (comments >= 0 && comments <= 100) {
          data["0-100"].push(newsItem);
        } else if (comments >= 101 && comments <= 200) {
          data["101-200"].push(newsItem);
        } else if (comments >= 201 && comments <= 300) {
          data["201-300"].push(newsItem);
        } else {
          data["301-n"].push(newsItem);
        }
      });

      fs.writeFileSync("combinator.json", JSON.stringify(data, null, 2));
      //   console.log("json file created ");
    });
  } catch (error) {
    console.error("Error while fetching", error);
  }
}
scrapDetails();
