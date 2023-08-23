const router = require("express").Router();
const Player = require("../models/Player");
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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const bod = req.body.bod;
    const nic = req.body.nic;
    const address = req.body.address;
    const city = req.body.city;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const postedDate = Date();
    const image = imageResult.secure_url;
    const imagenic = imagenicResult.secure_url;
    const imagepass = imagepassResult.secure_url;
    const cloudinaryID = imageResult.public_id;

    //create instance
    const newPlayer = new Player({
      userID,
      firstName,
      lastName,
      bod,
      nic,
      address,
      city,
      mobile,
      email,
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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const bod = req.body.bod;
    const nic = req.body.nic;
    const address = req.body.address;
    const city = req.body.city;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const postedDate = Date();
    const image = result.secure_url;
    const cloudinaryID = result.public_id;

    const updateItem = {
      id,
      firstName,
      lastName,
      bod,
      nic,
      address,
      city,
      mobile,
      email,
      postedDate,
      image,
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
