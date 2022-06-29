const express = require('express')
const app = express()
const port = 4000

const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'dzgsesdip',
  api_key: '234844499111316',
  api_secret: 'TNoxdXrtdBnBbLOVhHEdeI2IdXc'
});

app.get('/files', (req, res) => {
  cloudinary.v2.search
    .expression('folder:music/*')
    .sort_by('public_id','desc')
    .max_results(30)
    .execute()
    .then(result => {
      result = result.resources.map(song => {

        let name = song.filename.slice(0, song.filename.length - 7)
        name = name.replace('_', ' ')
        let file = song.filename + '.wav'
        return {name, file}
      })
      res.send(result)
    })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})