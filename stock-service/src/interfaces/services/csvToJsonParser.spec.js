import CsvToJsonParser from './csvToJsonParser';
import csvtojson from 'csvtojson';

jest.mock('csvtojson');

describe('CsvToJsonParser', () => {
  let csvToJsonParser;

  beforeEach(() => {
    csvToJsonParser = new CsvToJsonParser();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#parse', () => {
    const csvString = 'Symbol,Date,Time,Open,High,Low,Close,Volume,Name\r\nACU.US,2024-05-16,19:36:32,40,40.7699,39.95,40.01,5437,ACME UNITED\r\n';
    const expectedJson = {
      Symbol: 'ACU.US',
      Date: '2024-05-16',
      Time: '19:36:32',
      Open: '40',
      High: '40.7699',
      Low: '39.95',
      Close: '40.01',
      Volume: '5437',
      Name: 'ACME UNITED'
    };

    const mockedFromString = jest.fn().mockResolvedValue([expectedJson])
    csvtojson.mockImplementation(() => ({
      fromString: mockedFromString
    }))

    it('should parse CSV string to JSON', async () => {
      const result = await csvToJsonParser.parse(csvString);

      expect(result).toEqual(expectedJson);
    });

    it('should call csvtojson library with correct parameters', async () => {
      await csvToJsonParser.parse(csvString);

      expect(mockedFromString).toHaveBeenCalledWith(csvString);
    });
  });
});
