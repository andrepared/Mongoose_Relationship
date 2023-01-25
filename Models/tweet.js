// Connect to Mongoose 
const mongoose = require('mongoose');
const { Schema } = mongoose;
// Connect to DB.
mongoose.connect('mongodb://localhost:27017/tweets').
  catch(error => handleError(error))
console.log('Database Connected.');



// Create our first Model. 
const userSchema = new Schema({
    username: String,
    age: Number,
     
})
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User' },
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);


// Two User to start with. 
// User and a tweet Model. 
// const makeTweets = async () => {
//     const user = await User.findOne({usernname: 'ChickenFan99' })
//     // const user = new User({ username: 'ChickenFan99', age: 69 });
//     const tweet3 = new Tweet({ text: 'OMGGGGG!!!!!', likes: 223 });
//     tweet3.user = user; // associates the two 
//     tweet3.save();
// } 
// /* 
//  So, again, make one user, make one tweet. Then I'm setting that tweet to have the user property of this entire user object. But all that we've said is it needs to have an object ID. That's what we're referring to.
// We save both.
// */
// makeTweets();

/*
So I'm going to make a new function here called find tweets.

I can populate that user just like I could going the other direction.

I could populate the products field in a farm.

I can do the same thing to populate the user fields in a tweet.

So I'm going to go with const find tweet.
*/
const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user', 'username');
    console.log(t);
}
findTweet();


/*

But at this point, the main takeaways are we can embed documents or we can reference documents, and

often we use an object ID to do that, and then we use the populate method to get Mongo to go and fetch

the appropriate information, or rather mongoose to go and fetch the appropriate information and fill

*/ 