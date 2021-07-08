// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");

const fetch = require("node-fetch");

const hadist = require("./features/hadist");

const jdws = require("./features/jdws");

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    const body = message.body.substring(0, 5);
    const slice = message.body.split(/\s+/);
    if (message.body === "/start" && message.isGroupMsg === false) {
      client
        .sendText(
          message.from,
          `\t ✋ *Assalamualaikum Sahabat* ✋ \t \n Selamat Datang Di Bot Koentji Surga V.1 \n Bot ini adalah project open source yang mana tujuan author membuat ini untuk berbagi manfaat kepada sesama \n \n --- *List Fitur Bot* --- \n \n ✅ Generate Hadist berdasarkan keyword => /cari masukan keywordnya \n ✅ Jadwal Waktu Sholat => /jdws diikuti dengan nama kota \n \n \n Untuk fitur lainya akan menyusul yaa Terima kasih \n \n Created By : Muhammad Irhas Albais \n \n Follow Me : \n Github : https://github.com/irhasalba \n   `
        )
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }

    if (body == "/cari" && message.isGroupMsg === false) {
      hadist
        .getHadist(slice[1])
        .then((respoonse) => respoonse.json())
        .then((data) => {
          const randomly = Math.floor(Math.random() * data.results.length);
          const arab = data.results[randomly].arab_text;
          const translated = data.results[randomly].translated;
          const title = data.results[randomly].title;
          client.sendText(
            message.from,
            `Nomor Hadist : ${title} \n \n Hadist : ${arab} \n \n Terjemahan : ${translated}`
          );
        })
        .catch((response) => client.sendText(message.from, response));
    }

    if (body == "/jdws" && message.isGroupMsg === false) {
      jdws
        .getJadwalSholat(slice[1])
        .then((response) => response.json())
        .then((response) => {
          const shubuh = response.results.datetime[0].times.Fajr;
          const dzhur = response.results.datetime[0].times.Dhuhr;
          const asr = response.results.datetime[0].times.Asr;
          const magrib = response.results.datetime[0].times.Maghrib;
          const isya = response.results.datetime[0].times.Isha;
          const terbit = response.results.datetime[0].times.Sunrise;
          const imsak = response.results.datetime[0].times.Imsak;
          client.sendText(
            message.from,
            `\t *** JADWAL WAKTU SHOLAT UNTUK WILAYAH ${response.results.location.city} *** \t  \n \n ⏰ Shubuh :${shubuh} \n ⏰ Imsak : ${imsak} \n ⏰ Terbit : ${terbit} \n ⏰ Dzuhur : ${dzhur} \n ⏰ Ashar : ${asr} \n ⏰ Magrib : ${magrib} \n ⏰ Isya' : ${isya} `
          );
        })
        .catch((response) => {
          if (response.code != 200) {
            client.sendText(message.from, "Kota Tidak Ditemukan");
          }
        });
    } else {
      client
        .sendText(
          message.from,
          `\t ✋ *Assalamualaikum Sahabat* ✋ \t \n Selamat Datang Di Bot Koentji Surga V.1 \n Bot ini adalah project open source yang mana tujuan author membuat ini untuk berbagi manfaat kepada sesama \n \n --- *List Fitur Bot* --- \n \n ✅ Generate Hadist berdasarkan keyword => /cari masukan keywordnya \n ✅ Jadwal Waktu Sholat => /jdws diikuti dengan nama kota \n \n \n Untuk fitur lainya akan menyusul yaa Terima kasih \n \n Created By : Muhammad Irhas Albais \n \n Follow Me : \n Github : https://github.com/irhasalba \n   `
        )
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}
