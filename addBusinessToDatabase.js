const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')

const dbConnectionString = 'mongodb://root:XDrB4XoEZFInWNmtWRPZVPDl@finn.iran.liara.ir:30655/enamad?authSource=admin'

// Define the schema for the data you want to store
const scrapedDataSchema = new mongoose.Schema({
  domainAddress: String,
  businessTitle: String,
  city: String,
  stars: Number,
  grantDate: String,
  expiryDate: String,
});

// Define the model using the schema
const ScrapedData = mongoose.model('business', scrapedDataSchema);

// Function to scrape the website and store the data in the database
async function scrapeWebsite() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(dbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    let list = [];

    // Fetch data from page 2 to 3634
    for (let pageNumber = 2; pageNumber <= 3634; pageNumber++) {
      const response = await axios.get(`https://enamad.ir/DomainListForMIMT/Index/${pageNumber}`);
      const html = response.data;

      const $ = cheerio.load(html);
      const divContent = $('#Div_Content .row');

      divContent.each((i, row) => {
        const domain = $(row).find('.col-md-1 + .col-md-2 > a:nth-child(1)').text();
        const title = $(row).find('.col-md-3').text();
        const city = $(row).find('.col-md-3 + .col-md-1 + .col-md-1').text();
        const stars = $(row).find('.col-md-1 + .col-md-1 + .col-md-2').children().length;
        const grantDate = $(row).find('.col-md-1 + .col-md-2 + .col-md-1').text();
        const expirationDate = $(row).find('.col-md-1 + .col-md-2 + .col-md-1 + .col-md-1').text();

        list.push({
          domainAddress: domain,
          businessTitle: title,
          city,
          stars,
          grantDate,
          expiryDate: expirationDate,
        });
      });

      console.log(`Data from page ${pageNumber} has been scraped.`);
      console.log(list);
      // Insert the data into the database
      await ScrapedData.insertMany(list);
      list = []
    }

    console.log('Data has been scraped and stored successfully!');
  } catch (error) {
    console.error('Error while scraping and storing data:', error.message);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Call the function to start scraping the website
scrapeWebsite();