// index.js

const url = "https://news.ycombinator.com/";

fetch(url)
  .then((response) => response.text())
  .then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const results = {
      "0-100": [],
      "101-200": [],
      "201-300": [],
      "301-n": [],
    };

    const athingElements = doc.querySelectorAll(".athing");
    athingElements.forEach((element) => {
      const titleElement = element.querySelector(".title .storylink");
      const title = titleElement ? titleElement.textContent.trim() : "";
      const link = titleElement ? titleElement.getAttribute("href") : "";
      const subtextElement =
        element.nextElementSibling.querySelector(".subtext");
      const commentsText = subtextElement
        ? subtextElement.lastElementChild.textContent
        : "";
      let comments = 0;

      if (commentsText.includes("comment")) {
        comments = parseInt(commentsText.split(" ")[0]);
      }

      const newsItem = {
        title,
        link,
        comments,
      };

      if (comments >= 0 && comments <= 100) {
        results["0-100"].push(newsItem);
      } else if (comments >= 101 && comments <= 200) {
        results["101-200"].push(newsItem);
      } else if (comments >= 201 && comments <= 300) {
        results["201-300"].push(newsItem);
      } else {
        results["301-n"].push(newsItem);
      }
    });

    const resultsElement = document.getElementById("results");
    resultsElement.textContent = JSON.stringify(results, null, 2);
  })
  .catch((error) => {
    console.error("Error fetching the page:", error);
  });
