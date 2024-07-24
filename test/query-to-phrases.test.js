import { test, expect } from "vitest";
import queryPhrase from "../src/search/query-phrase"
import fs from "fs"

var queries = JSON.parse(fs.readFileSync("./data/quora-queries-15k.json", "utf8"))



var sample =["what is  albert einstein's favorite programming language?"]
//,"What are some ways of building a website from scratch?","How are the 6 mother sauces used in cooking?","How can I get over a girl that I really liked?","What's the most embarrassing thing you've ever said in a foreign language by accident?","How I get my redeem code?","What do you think about Rahul Gandhi's statement that there is 'personal corruption' involving PM Modi?","How is service of Uber in India?","What is organization?","How would you pick locks?","How do I get iTunes on my laptop?","What is the cause of buoyant force?","Which is the deadliest snake on earth?","What are some good birthday gifts to mom?","What are the latest technology in IT sector?","Is dark matter the luminiferous ether?","Is it easy to find a real friends on a social networking websites?","What is the feeling of cocaine?","What should you say when asked \"Do you know why I pulled you over?\"","How many developers are working at dropbox?","What are the Virat Kohli’s ODI records broken by Hashim Amla?","What are some safe ways to runaway from home?","Is it safe to eat moldy bread if I toast it?","Where can I found extremely talented painters in Sydney?","What is there to do in Amsterdam?","Is there any concrete evidence of reincarnation?","What makes developers happy?","What makes it easy for polyglots to learn multiple languages?","Can I dynamically declare an array in C++?","How do I stop myself from smoking?","Would there be a difference in weight of 1 TB hard disk with full 1 TB data and a empty hard disk?","How have your experiences with using Tinder been?","What are the most profitable online businesses?","If a war erupts between India and Pakistan with whom will Iran side?","What are passing marks in Delhi University semester exam?","What is the definition of common defense?","Was Obama aware that Clinton had a private server?","What does it mean when a phone rings once and then goes straight to voicemail?","Why do we need to take care of elderly people?","Where can I learn about stock trading from the start?","If you have to choose between money, power and a peaceful life, what would you choose and why?","What are the steps you need to take to write and publish a book?","Father name in class 10 marksheet is H L RANA & in all other certificate it is full written HEMLAL RANA will it create any problem in gov jobs?","How do we choose and make decisions?","What's your earliest memory and how old were you?","Is there a reason why Bucharest and Budapest sound really similar?","What is there to look forward to in life?","To what is \"A Modest Proposal\" considered a parody? Why?","How do you stop a puppy from barking all night?","Why do I find it difficult to make decisions? What can be done to change this situation?","What are some best revenge movies?","How can you determine the formula for heat combustion?","How many days does it take a PAN card to arrive after applying?"]

test("query to keyphrases", async () => {

    for (var q of queries.slice(1600,1900)){

        // q =     "i like to make black music, gold medal red wine lucid dreaming wine tasting opinion on openai";

    //example usage
    var result = queryPhrase(q)
    
    var str = result.map(r=>  r.full + (r.full.includes(" ")? " (Phrase)" : "") 
        + " " + (r.w? "(Wiki: " + r.w  + ")":"") ).join("   ")
    console.log(str);

    }

    expect(result).toBeDefined()

})