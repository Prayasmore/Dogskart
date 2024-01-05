import express from "express";
import ejs from "ejs";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

const imageHistory = [];

// Assuming we have the dogs list for the website
const cartItems = [
	{ name: "golden retriever", price: 40000 },
	{ name: "labrador", price: 20000 },
	{ name: "labradoodle", price: 100000 },
	{ name: "bernedoodle", price: 85000 },
	{ name: "goldendoodle", price: 100000},
	{ name: "pembroke Welsh Corgi", price: 100000},
	{ name: "german shepherd", price: 45000},
	{ name: "dachshund", price: 12000},
	{ name: "beagle", price: 16000},
	{ name: "boxer", price: 18000},
	{ name: "tibetan mastiff", price: 30000},
	{ name: "english cocker spaniel", price: 15000},
	{ name: "pug", price: 15000},
	{ name: "rottweiler", price: 20000},
	{ name: "doberman", price: 20000},
	{ name: "great Dane", price: 25000},
	{ name: "pomeranian", price: 8000},
	{ name: "indian spitz", price: 8000},
	{ name: "lhasa apso", price: 20000},
	{ name: "siberian husky", price: 25000},
	{ name: "english bulldog", price: 35000},
	{ name: "saint bernard", price: 30000},
	{ name: "maltese dog", price: 125000},
	{ name: "boerboel", price: 225000},
	{ name: "afghan hound", price: 80000},
	{ name: "alaskan malamute", price: 350000},
	{ name: "caucasian mountain shepherd dog", price: 300000},
	{ name: "newfoundland dog", price: 300000},
	{ name: "english mastiff", price: 1000000},
	{ name: "red nose pitbull terrier", price: 100000},
	{ name: "caravan hound", price: 15000},
	{ name: "bully kutta", price: 20000},
	{ name: "wire haired dachshund", price: 50000},
	{ name: "boo", price: 30000},
	{ name: "shiba inu", price: 150000},
	{ name: "bullmastiff", price: 80000},
	{ name: "chihuahua", price: 25000},
	{ name: "poodle", price: 25000},
	{ name: "yorkshire terrier", price: 45000},
	{ name: "german shorthaired pointer", price: 45000},
	{ name: "shih tzu", price: 25000},
	{ name: "bloodhound", price: 100000},
	{ name: "chow chow", price: 500000},
	{ name: "samoyed", price: 680000},
	{ name: "dalmation", price: 15000},
	{ name: "akita Inu", price: 400000},
	{ name: "cavalier king charles spaniel", price: 100000},
	{ name: "french bulldog", price: 90000},
	{ name: "border collie", price: 40000},
	{ name: "cane corso", price: 80000},
	{ name: "basset hound", price: 35000},
	{ name: "greyhound", price: 50000},
	{ name: "bichon frise", price: 55000},
	{ name: "papillon", price: 80000},
	{ name: "havanese dog", price: 90000},
	{ name: "boston terrier", price: 70000},
	{ name: "bernese mountain dog", price: 90000},
	{ name: "bolognese dog", price: 90000},
	{ name: "american staffordshire terrier", price: 85000},
	{ name: "affenpinscher", price: 100000}
	];;

async function getRandomDogImage() {
	try {
		const response = await axios.get("https://dog.ceo/api/breeds/image/random");
		return response.data.message;
	} catch (error) {
		console.log("Error fetching dog image: ", error.message);
	}
}


app.get("/", async (req, res) => {
	try {
		const dogImage = await getRandomDogImage();
		imageHistory.push(dogImage);
		res.render("home", { dogImage });
	} catch (error) {
		res.status(500).send("Internal Server Error");
	}
});

app.post('/fetch', async (req, res) => {
	try {
	  const dogImage = await getRandomDogImage();
	  imageHistory.push(dogImage);
	  res.render('home', { dogImage });
	} catch (error) {
	  res.status(500).send('Internal Server Error');
	}
});

app.get('/history', (req, res) => {
	res.render('history', { imageHistory });
  });
  
  // Add to cart with total route
app.get('/cart', (req, res) => {
	res.render('cart', { cartItems });
});

app.post("/add-to-cart", (req, res) => {
	const dogs = req.body;
	let selectedDogs = [];
	for(let dog in dogs) {
		cartItems.forEach(item => {
			if (item.name === dog) {
				selectedDogs.push(item);
			}
		})
	}
	console.log(selectedDogs);
	const total = selectedDogs.reduce((acc, item) => acc + item.price, 0);
	res.render("cart", {cartItems, selectedDogs, total});
});


app.listen(port, () => console.log(`Server started on port: ${port}`));