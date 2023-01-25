const mongoose = require('mongoose');
// Connect to DB.
mongoose.connect('mongodb://localhost:27017/relationshipDB').
  catch(error => handleError(error))
console.log('Database Connected.');

// Define Schema for User. 
const userSchema = new mongoose.Schema({
    first: String, 
    last: String, 
    address: [
        {
            _id: { id: false},
            address: String,
            city: String,
            state: String,
            country: String
        }]

})
const User = mongoose.model('user', userSchema); 

const makeUser = async () => {
    const u = new User({
        first: 'Harry', 
        last: 'Potter'
    })
    u.address.push({
        street: '123 Sesame St.',
        city: 'Austin',
        state: 'TX',
        country: 'IMAGINATION LAND'
    })
    const res = await u.save();
    console.log(res);
}
const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '444 Jacobs St.',
        city: 'NY',
        state: 'NY',
        country: 'IMAGINATION LAND'
    })
    const res = await user.save();
    console.log(res);
}

makeUser();
