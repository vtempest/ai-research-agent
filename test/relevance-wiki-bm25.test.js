import { weighRelevanceTermFrequency } from "../index.js";
import { test, expect } from "vitest";
const  sampleNewsDocs = [
  {
    "id": 1,
    "title": "SpaceX Successfully Launches Satellite into Orbit",
    "content": "SpaceX, the private space company founded by Elon Musk, successfully launched a communications satellite into orbit today. The Falcon 9 rocket lifted off from Cape Canaveral at 3:30 PM EST, carrying the satellite for a major telecommunications company. This marks SpaceX's 15th successful launch this year, further cementing its position in the commercial space industry."
  },
  {
    "id": 2,
    "title": "Global Climate Summit Ends with New Emissions Agreement",
    "content": "The United Nations Climate Change Conference concluded today with a landmark agreement to reduce global carbon emissions. Over 190 countries signed the pact, which aims to limit global temperature rise to 1.5 degrees Celsius above pre-industrial levels. The agreement includes provisions for developed nations to provide financial assistance to developing countries in their efforts to combat climate change."
  },
  {
    "id": 3,
    "title": "New AI Algorithm Detects Early Signs of Alzheimer's",
    "content": "Researchers at Stanford University have developed a new artificial intelligence algorithm that can detect early signs of Alzheimer's disease with unprecedented accuracy. The AI analyzes brain scans and patient data to identify subtle patterns indicative of the disease's onset. This breakthrough could lead to earlier interventions and improved patient outcomes in the fight against Alzheimer's."
  },
  {
    "id": 4,
    "title": "Stock Market Reaches All-Time High Amid Economic Optimism",
    "content": "The Dow Jones Industrial Average closed at a record high today, buoyed by positive economic data and strong corporate earnings reports. The S&P 500 and Nasdaq also saw significant gains, reflecting growing investor confidence in the economic recovery. Analysts attribute the surge to declining unemployment rates and expectations of continued low interest rates."
  },
  {
    "id": 5,
    "title": "Major Data Breach Exposes Millions of User Accounts",
    "content": "A leading social media platform announced today that it had suffered a massive data breach, potentially exposing the personal information of over 50 million users. The compromised data includes email addresses, phone numbers, and encrypted passwords. Cybersecurity experts are urging users to change their passwords immediately and enable two-factor authentication to protect their accounts."
  },
  {
    "id": 6,
    "title": "Breakthrough in Renewable Energy: New Efficient Solar Cells Developed",
    "content": "Scientists at MIT have created a new type of solar cell that converts sunlight to electricity with unprecedented efficiency. The new cells, made from a novel perovskite material, achieve a conversion rate of 29.15%, significantly higher than current commercial solar panels. This breakthrough could revolutionize the solar energy industry and accelerate the transition to renewable energy sources."
  },
  {
    "id": 7,
    "title": "Global Food Shortage Looms as Crop Yields Decline",
    "content": "The United Nations Food and Agriculture Organization (FAO) warned today of a potential global food crisis as crop yields in major agricultural regions continue to decline. Extreme weather events, linked to climate change, have significantly impacted harvests in North America, Europe, and Asia. The FAO is calling for urgent action to enhance food security and support affected farmers."
  },
  {
    "id": 8,
    "title": "New Cancer Treatment Shows Promise in Clinical Trials",
    "content": "A groundbreaking cancer treatment using genetically modified T-cells has shown remarkable results in early clinical trials. The therapy, known as CAR-T cell therapy, has led to complete remission in 94% of patients with advanced leukemia. Researchers are now exploring its potential application in treating solid tumors, potentially revolutionizing cancer treatment."
  },
  {
    "id": 9,
    "title": "Tech Giants Face Antitrust Lawsuit",
    "content": "The Department of Justice filed a major antitrust lawsuit against several tech giants today, alleging anticompetitive practices in the online advertising market. The lawsuit claims that these companies have unfairly dominated the digital ad space, stifling competition and innovation. If successful, the case could lead to significant changes in the tech industry landscape."
  },
  {
    "id": 10,
    "title": "Archaeological Discovery Rewrites Ancient History",
    "content": "Archaeologists in Egypt have unearthed a previously unknown ancient city dating back more than 3,000 years. The discovery, near Luxor, includes well-preserved houses, administrative buildings, and a bakery still containing ancient tools and utensils. Experts say this find could provide unprecedented insights into daily life in ancient Egypt and may require a reevaluation of certain historical assumptions."
  }
]
test("WikiBM25 - cancer", () => {
  const query = "cancer";

  var results = sampleNewsDocs
    .map((doc, index) => {
      var docText = doc.title + " " + doc.content;
      var score = weighRelevanceTermFrequency(docText, query);

      return { score, title: doc.title };
    })
    .sort((a, b) => b.score - a.score)
    .filter((doc) => doc.score > 0);

  expect(results[0].title).toBe(
    "New Cancer Treatment Shows Promise in Clinical Trials"
  );

  console.log(results);
}, 3000);

test("WikiBM25 - climate change", () => {
  const query = "climate change"

  var results = sampleNewsDocs
    .map((doc, index) => {
      var docText = doc.title + " " + doc.content;
      var score = weighRelevanceTermFrequency(docText, query );

      return { score, title: doc.title };
    })
    .sort((a, b) => b.score - a.score)
    .filter((doc) => doc.score > 0);

    console.log(results);
  if (results.length)
    expect(results[0]?.title).toBe(
      "Global Climate Summit Ends with New Emissions Agreement"
);

}, 3000);
