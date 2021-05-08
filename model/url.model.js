const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => console.log("error mongoose " + e));

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

let state_status = () => {
  let output = "";
  switch (connection.readyState) {
    case 0:
      output = "disconnected";
      break;
    case 1:
      output = "connected";
      break;
    case 2:
      output = "connecting";
      break;
    case 3:
      output = "disconnecting";
      break;
    default:
      break;
  }
  return output;
};

const url_schema = new Schema({
  original: { type: String, required: true },
  short_url: { type: String, required: true },
});

let URL_Model = mongoose.model("URL", url_schema);

const create = (original_url, shortened_url) => {
  let new_short_url = new URL_Model({
    original: original_url,
    short_url: shortened_url,
  });

  new_short_url.save((err, data) => {
    if (err) return console.log(err);
    return data;
  });
};

const findOne = function (param_search) {
  URL_Model.findOne({ short_url: this.param_search }, (err, result) => {
    if (err) return console.log(err);
    return result;
    // return found;
  });
};

const findTest = (param, done) => {
  URL_Model.findOne({ short_url: param }, (err, result) => {
    console.log(param);
    if (err) return done(err, null);
    return done(null, result);
  });
};

//---------* All exports are below this line *---------//
exports.URL_Model = URL_Model;
exports.create = create;
exports.findOne = findOne;
exports.state_status = state_status;
exports.findTest = findTest;
