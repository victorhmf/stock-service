import csvtojson from 'csvtojson'

class CsvToJsonParser {
  async parse(csvString) {
    const json = await csvtojson().fromString(csvString)

    return json[0]
  }
}

export default CsvToJsonParser