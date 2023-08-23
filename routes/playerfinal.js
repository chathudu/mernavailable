const router = require("express").Router();
const Player = require("../models/Playerfinal");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

//additem to store
router.route("/add").post(upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'imagenic', maxCount: 1 },
  { name: 'imagepass', maxCount: 1 }
]), async (req, res) => {
  // try {
  //   await cloudinary.image;
  //   const result = await cloudinary.uploader.upload(req.file.path, {
  //     folder: "player-system-files/",
  //   });
  try {
    if (!req.files || !req.files['image'] || !req.files['imagenic'] || !req.files['imagepass']) {
      return res.status(400).json({ error: "Required files are missing." });
    }
  
    const imageResult = await cloudinary.uploader.upload(req.files['image'][0].path, {
      folder: "player-system-files/"
    });
  
    const imagenicResult = await cloudinary.uploader.upload(req.files['imagenic'][0].path, {
      folder: "player-system-files/"
    });
  
    const imagepassResult = await cloudinary.uploader.upload(req.files['imagepass'][0].path, {
      folder: "player-system-files/"
    });


    const userID = req.body.userID;
    const fullname = req.body.fullname;
    const namewithinitial = req.body.namewithinitial;
    const bod = req.body.bod;
    const school = req.body.school;
    const education = req.body.education;
    const currentoc = req.body.currentoc;
    const previosoc = req.body.previosoc;
    const qulificationyear = req.body.qulificationyear;
    const address = req.body.address;
    const mobile = req.body.mobile;
    const watsapp = req.body.watsapp;
    const email = req.body.email;
    const nic = req.body.nic;
    const passport = req.body.passport;
    const currentstatus = req.body.currentstatus;
    const previosclub = req.body.previosclub;
    const postedDate = Date();
    const image = imageResult.secure_url;
    const imagenic = imagenicResult.secure_url;
    const imagepass = imagepassResult.secure_url;
    const cloudinaryID = imageResult.public_id;

    //create instance
    const newPlayer = new Player({
      userID,
      fullname,
      namewithinitial,
      bod,
      school,
      education,
      currentoc,
      previosoc,
      qulificationyear,
      address,
      mobile,
      watsapp,
      email,
      nic,
      passport,
      currentstatus,
      previosclub,
      postedDate,
      image,
      imagenic,
      imagepass,
      cloudinaryID,
    });

    //save
    await newPlayer.save();
    res.json(newPlayer);
  } catch (error) {
    console.log(error);
  }
});

//get all items
router.route("/").get((req, res) => {

  Player.find()
    .then((player) => {
      res.json(player);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get user details by ID
router.get('/getUserDetails/:id', async (req, res) => {


  try {
    const userId = req.params.id;
    const user = await Player.findById(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//delete an item
router.route("/delete/:id").delete(async (req, res) => {
  try {
    let itemID = req.params.id;

    let player = await Player.findById(req.params.id);
    console.log(player);

    const val = await cloudinary.uploader.destroy(item.cloudinaryID, {
      folder: "player-system-files/",
    });

    console.log(val);

    await Player.findByIdAndDelete(itemID);
    res.status(200).send({ status: "Item Deleted!!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error while deleting the record!!" });
  }
});

//get one item
router.route("/get/:id").get(async (req, res) => {
  let id = req.params.id;

  const player = await Player.findById(id)
    .then((player) => {
      res.status(200).send({ status: "Item Details", player });
    })
    .catch((err) => {
      console.log(err.messege);
      res
        .status(500)
        .send({ status: "Error while getting Item", error: err.messege });
    });
});

//get items of a user

router.route("/getUserItems/:id").get(async (req, res) => {
  let id = req.params.id;

  const player = await Player.find({ userID: id })

    .then((player) => {
      res.status(200).send({ status: "This User Items Details", player });
    })
    .catch((err) => {
      console.log(err.messege);
      res
        .status(500)
        .send({ status: "Error while getting Item", error: err.messege });
    });
});

//update item
router.route("/update/:id").put(upload.single("image"), async (req, res) => {
  try {
    let oldPlayer = await Player.findById(req.params.id);

    await cloudinary.uploader.destroy(oldPlayer.cloudinaryID, {
      folder: "player-system-files/",
    });
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "player-system-files/",
    });
    let itemID = req.params.id;

    const id = req.body.id;
    const userID = req.body.userID;
    const fullname = req.body.fullname;
    const namewithinitial = req.body.namewithinitial;
    const bod = req.body.bod;
    const school = req.body.school;
    const education = req.body.education;
    const currentoc = req.body.currentoc;
    const previosoc = req.body.previosoc;
    const qulificationyear = req.body.qulificationyear;
    const address = req.body.address;
    const mobile = req.body.mobile;
    const watsapp = req.body.watsapp;
    const email = req.body.email;
    const nic = req.body.nic;
    const passport = req.body.passport;
    const currentstatus = req.body.currentstatus;
    const previosclub = req.body.previosclub;
    const postedDate = Date();
    const image = imageResult.secure_url;
    const imagenic = imagenicResult.secure_url;
    const imagepass = imagepassResult.secure_url;
    const cloudinaryID = imageResult.public_id;

    const updateItem = {
      id,
      fullname,
      namewithinitial,
      bod,
      school,
      education,
      currentoc,
      previosoc,
      qulificationyear,
      address,
      mobile,
      watsapp,
      email,
      nic,
      passport,
      currentstatus,
      previosclub,
      postedDate,
      image,
      imagenic,
      imagepass,
      cloudinaryID,
    };
    const update = await Player.findByIdAndUpdate(itemID, updateItem);
    res.status(200).send({ status: "Item Details Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error while updating Data" });
  }
});

module.exports = router;
