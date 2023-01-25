// Connect to Mongoose 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Connect to DB.
mongoose.connect('mongodb://localhost:27017/relationshipDB').
  catch(error => handleError(error))
console.log('Database Connected.');

// Create our first Model. 
const productSchema = new  Schema({
    name: String,
    price: Number,
    season: [
        {
            type: String,
            enum: ['Spring', 'Summer', 'Fall', 'Winter']
        }]
});
const farmSchema = new Schema({
    name: String, 
    city: String, 
    products: [
        { type: Schema.Types.ObjectId, ref: 'Product' }]
})


const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Goddess Melon', price: '2.99', season: 'Spring' },
//     { name: 'Watermelon', price: '1.99', season: 'Summer' },
//     { name: 'Tomato', price: '0.99', season: 'Summer' },
// ]);
// Create our Second Model. 

const makeFarm = async () => {
    const farm = new Farm({ name: 'Bubbly Farms', city: 'Electric Boogalu' });
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    farm.products.push(melon)
    await farm.save();
    console.log(farm)
}
makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Bubbly Farms' });
    const watermelon = await Product.findOne({ name: 'Watermelon' });
    farm.products.push(watermelon)
    await farm.save();
    console.log(farm)
}
addProduct();

Farm.findOne({ name: 'Bubbly Farms' })
    .populate('products')
    .then(farm => console.log(farm))