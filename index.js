require("dotenv/config")    // DEBE SER LA 1ra LINEA DEL FILE

const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.am7o5.mongodb.net/recipe?retryWrites=true&w=majority`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.insertMany(data)
    .then(()=>{
      Recipe.findOneAndUpdate(
        {title: "Rigatoni alla Genovese"},
        {$set: {duration: 100}},
        {new: true},
      )
      .then(()=>{
        Recipe.deleteOne(
          {title: "Carrot Cake"}
        ).then(()=>{
          console.log("carrot")
          
        })
      })
    })
    
  }) 
  .catch(error => {
    console.error('Error connecting to the database', error);
   
    
  });
  mongoose.connection.close(console.log("closed"))







      /*
    Recipe.create({
      title: "CausaLimeña",
      level: "Amateur Chef",
      ingredients: ["potatoes", "chicken", "aji amarillo"],
      cuisine: "Peruvian",
      dishType: "other",
      image: `https://t2.rg.ltmcdn.com/es/posts/8/6/2/causa_limena_31268_600.jpg`,
      duration: 1,
      creator: "Peru",
      created: 01/01/1900,
    });
    console.log(`Connected to causaLimeña ${x.recipe[0]}` )
    */