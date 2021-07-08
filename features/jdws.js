const fetch = require("node-fetch");

exports.getJadwalSholat = (data) => {
  return new Promise((resolve, reject) => {
    const url = fetch(
      `https://api.pray.zone/v2/times/today.json?city=${data}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    resolve(url);
    reject("Maaf keyword yang anda cari tidak ada");
  });
};
