import Key from "../model/key.js";

export const createKey = async (req, res) => {
  try {
    const keyData = new Key(req.body);
    const {keyNumber} = keyData;

    const keyExist = await Key.findOne({keyNumber})

    if(keyExist){
         return res.status(400).json({message : "Key already exists" })
    }

        const savedKey = await keyData.save();

        res.status(201 ).json(savedKey)
  } catch (error) {
    res.status(500).json({error : "Internal Server Error. "});
  }
};

// GET all keys
export const getKeys = async (req, res) => {
  try {
    const keys = await Key.find();

    if(keys.length === 0){
      return res.status(404).json({message:"Keys not Found."});
    } 

    es.status(200).json(keys);

  }catch (error) {
    res.status(500).json({error:"Internal server error."});
  }
};

// GET single key
export const getKeyById = async (req, res) => {
  try {
    const key = await Key.findById(req.params.id);

    if (!key) {
      return res.status(404).json({ message: "Key not found" });
    }

    res.status(200).json(key);
  }
  catch (error) {
    res.status(500).json({error:"Internal server error."});
  }
};
  
// UPDATE key
export const updateKey = async (req, res) => {
  try {
    const id = req.params.id;

    const keyExist = await Key.findOne({_id:id})
      if(!keyExist){
        return res.status(404).json({message:"Keys not Found."});
      }

        const updateKey = await Key.findByIdAndUpdate(id, req.body, {new : true});
        res.status(200).json(updateKey);
  } catch (error) {
    res.status(500).json({error:"Internal server error."});
  }
};

// DELETE key
export const deleteKey = async (req, res) => {
  try {
    const id = req.params.id;
  
    const keyExist = await Key.findOne({_id:id})
    if(!keyExist){
      return res.status(404).json({message:"Keys not Found."});
    }   

    await Key.findByIdAndDelete(id);
    res.status(200).json({ message: "Key deleted successfully" });
  } catch (error) {
     res.status(500).json({error:"Internal server error."});
  }
};