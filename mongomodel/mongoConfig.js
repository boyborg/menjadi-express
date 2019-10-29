const mongoose = require("mongoose");//mengambil library mongoose
mongoose.connect('mongodb://localhost/belajarmongo');// mengkoneksikan ke db mongo
module.exports=mongoose;//export module mongoose

//commit -m "config mongo dan koneksi ke db"