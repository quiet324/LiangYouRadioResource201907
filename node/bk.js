const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const download = require('download');

x('http://txly2.net/bk', 'tbody tr', [{
        "time": '.ss-title a',
        "title": '.ss-title p',
        "downUrl": '.ss-dl a@href'
    }])
    .paginate('.pagenav@href')
    .limit(2)
    // .write('results.json')
    (function(err, results) {
        results = results.reverse();
        results.forEach(function(audio, arrayIndex) {

            var index = audio.downUrl.indexOf('?');
            var sub = audio.downUrl.substring(0, index);
            var lastIndex = audio.downUrl.lastIndexOf('/');
            var fileName = sub.substring(lastIndex + 1);
            audio.downUrl = sub;
            audio.time = audio.time.substring(audio.time.indexOf('-') + 1);
            download(audio.downUrl).then(data => {
                fs.writeFileSync('./bk/' + fileName, data);
            });
            audio.duration = 560;
            audio.size = "4.5M";
            audio.artistId = 4;
            audio.artistName = "听书‧想飞";
            audio.id = 4000001 + arrayIndex;

        });

        fs.writeFile("./bk.json", JSON.stringify(results, null, '\t'));
    });