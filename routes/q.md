This is the code for my express-node-mongoose app. This is a post route which will find and return all Quiz in response.

app.get("/user_quiz" , async function(req,res) {
  try {
    const quizes = await Quiz.find({});
    return res.status(200).json({msg : "success" , quizes });
  } catch(error) {
    return res.status(400).json({msg : "failure" , error  });
  }
});

I have jwt (javascript web token) implemented now. The have written a function for middleware. 

const isLogin = (req,res,next)=>{
 try {
    // get token from request header
    const token = req.headers.authorization.split(" ")[1];
    console.log("token",token);
    if(token == null || token == ""){
    res.status(404).json({message : "Auth token not found:you may not be logged in."});
    }
    // verify token with JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user id from decoded token
    const userId = decoded.id;

    // // find user by id
    const user = await Subscriber.findById(userId);

    if (user) {
      return res.status(200).json({ msg: "success",user });
    } else {
      return res.status(401).json({ msg: "unauthorized" });
    }

  } catch (error) {
    return res.status(401).json({ msg: "unauthorized" });
  }
}

Question 1: How do I connect my route and middleware 
Question 2: Is the code for middleware correct?