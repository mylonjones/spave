const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const path = require('path')
const axios = require('axios')

const cloudinary = require('cloudinary')

// cloudinary.config({
//   cloud_name: 'dzgsesdip',
//   api_key: '234844499111316',
//   api_secret: 'TNoxdXrtdBnBbLOVhHEdeI2IdXc'
// });

cloudinary.config({
  cloud_name: 'djsqhh5qc',
  api_key: '838511694775939',
  api_secret: 'hGzoVk5vVrfbNOfxh0bJf3uAji8'
});


app.use(express.static(path.join(__dirname, '/build')));

app.get('/files', async (req, res) => {

  let data = {}

  await cloudinary.v2.search
    .expression('folder:PRODUCTION/*')
    .max_results(30)
    .execute()
    .then(result => {
      result = result.resources.map(song => {

        let name = song.filename.slice(0, song.filename.length - 7)
        name = name.replace('_', ' ')
        let file = song.filename + '.wav'
        return {name, file}
      })
      data.production = result
    })

  await cloudinary.v2.search
    .expression('folder:COMPOSITION/*')
    .sort_by('public_id','desc')
    .max_results(30)
    .execute()
    .then(result => {
      result = result.resources.map(song => {

        let name = song.filename.slice(0, song.filename.length - 7)
        name = name.replace(/_/g, ' ')
        let file = song.filename + '.wav'
        return {name, file}
      })
      data.composition = result
    })

    res.send(data)



})

app.get('/testLimits', async (req, res) => {

  let data = {}

  await cloudinary.v2.search
    .expression('folder:PRODUCTION/*')
    .max_results(30)
    .execute()
    .then(result => {
      data = result
    })
    res.send(data)
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

let requestToHeroku = () => {
  setTimeout(() => {
    axios('http://www.apollosproductions.com')
      .then((res) => {
      })
      requestToHeroku()
  }, 300000);
}

requestToHeroku()