module.exports = json

function json(change) {
  return function update(data) {
    var output

    try {
      output = JSON.stringify(data, null, 2)
    } catch(err) {
      output = err.stack
    }

    change('<pre>' + output + '</pre>')
  }
}
