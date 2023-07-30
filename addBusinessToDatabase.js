const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const dbConnectionString = `mongodb://root:XDrB4XoEZFInWNmtWRPZVPDl@finn.iran.liara.ir:30655/enamad?authSource=admin`;

// Define the schema for the data you want to store
const scrapedDataSchema = new mongoose.Schema({
  domain: String,
  city: String,
  title: String
});

// Define the model using the schema
const ScrapedData = mongoose.model('business', scrapedDataSchema);
// Connect to the MongoDB database
await mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to scrape the website and store the data in the database
async function scrapeWebsite(pageNumber) {
    try {
      // Fetch the HTML content of the website for the specified page number
      const response = await axios.get(`https://enamad.ir/DomainListForMIMT/Index/${pageNumber}`);
      const html = response.data;

  
      // Use cheerio to parse the HTML and extract the desired text
      const $ = cheerio.load(html);
      const city = $('.col-sm-12.col-md-1').map((i, el) => $(el).text()).get()
      const domain = $('.col-sm-12.col-md-2 a').map((i, el) => $(el).text()).get()
      const title = $('.col-sm-12.col-md-3').map((i, el) => $(el).text()).get()
      

      // Create a new document for each domain in the database
      for (let i = 0; i < domain.length; i++) {
        const domainData = {
          domain: domain[i],
          title: title[i],
          city: city[i],
        };
        console.log(domainData)
        const mmd = await ScrapedData.create(domainData);
        console.log(mmd);
      }

      console.log(`Data from page ${pageNumber} has been scraped and stored successfully!`);
    } catch (error) {
      console.error(`Error while scraping and storing data from page ${pageNumber}:`, error.message);
    }
}
  
  // Call the function to start scraping the website and storing the data for pages 2 to 3634
  async function scrapeAllPages() {
    for (let pageNumber = 2; pageNumber <= 3634; pageNumber++) {
      await scrapeWebsite(pageNumber);
    }
  
    // Close the database connection after scraping all pages
    mongoose.disconnect();
  }
  
  // Call the function to start scraping all pages
  scrapeAllPages();