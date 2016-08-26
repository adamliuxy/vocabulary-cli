'use strict';

const path = require('path')
const Collection = require('../collection')

module.exports = function (client) {
  client
    .command(':select <collection>')
    .alias(':s')
    .description('Select your vocabulary collection.')
    .action(function(args, callback) {
      const collectionName = args.collection
      const collectionPath = './temp/' + collectionName

      try {
        client.context.collection = new Collection(collectionPath)
      } catch (e) {
        this.log(e)
        callback()
      }

      const name = path.basename(collectionName, path.extname(collectionName))
      client.delimiter(name + '>')
      callback()
    })
}
