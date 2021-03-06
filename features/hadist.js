const fetch = require("node-fetch");

exports.getHadist = (data) => {
  return new Promise((resolve, reject) => {
    const url = fetch(
      `https://api.devinesia.com/buka-hadis/?keyword=${data}&field=title,translated,arab_text`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip",
          "Content-Encoding": "gzip",
        },
      }
    );

    resolve(url);
    reject("Mohon Maaf Keyword Tidak Dikenali");
  });
};
