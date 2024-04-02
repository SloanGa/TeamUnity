const Post = require("../database/models/post.model");
const { getPosts, deletePost } = require("../queries/post.queries");

exports.postCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const post = await new Post({
      username: req.user.username,
      team: req.user.team.teamname,
      message: body.message,
      avatar: req.user.avatar,
    });
    post.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

// exports.postEdit = async (req,res,next)=>{
//   try{

//   }catch(e){
//     next(e)
//   }
// }

exports.postDelete = async (req, res, next) => {
  try {
    console.log(req.params);
    const postId = req.params.postId;
    console.log(postId);
    await deletePost(postId);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.postList = async (req, res, next) => {
  try {
    await getPosts();
  } catch (e) {
    next(e);
  }
};
