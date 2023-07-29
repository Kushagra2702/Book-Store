const Book=require("../model/Book");




const getAllBooks= async(req,res,next) =>{
    let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No books found" });
  }
  return res.status(200).json({ books });

}


const getById=async(req,res,next)=>{
    const id =req.params.id;
    let book;
    try{
        book = await Book.findById(id);
    } catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(404).json({message:"No Book found"});
    }
    return res.status(200).json({book});
};

const addBook=async(req,res,next)=>{
    const {name,author,description,price,available,image}= req.body;
    let book;
    try{
        book = new Book({
            //name: req.body.name
            name,
            author,
            description,
            price,
            available,
            image
        });
        await book.save(); //function to save in the database
    }catch (err){
        console.log(err);
    }

    if(!book){
        return res.status(500).json({message:'Unable To Add'});
    }
    return res.status(201).json({book});
};

const updateBook=async(req,res,next)=>{
    const id=req.params.id; //id in the url 
    const {name,author,description,price,available,image}= req.body;
    let book;
    try{
        book = await Book.findByIdAndUpdate(id,{
            name,
            author,
            description,
            price,
            available,
            image
        });
        book =await book.save();
    }catch(err){
        conole.log(err);
    }
    if(!book){
        return res.status(404).json({message:'Unable To Update By This ID'});
    }
    return res.status(201).json({book});
};

const deleteBook=async(req,res,next)=>{
    const id =req.params.id;
    let book;
    try{
        book=await Book.findByIdAndRemove(id);
    } catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(404).json({message:'Unable To Delete By This ID'});
    }
    return res.status(201).json({message:'Product Successfully Deleted'});
};

exports.getAllBooks=getAllBooks; //whenever getAllBooks function is called
exports.addBook=addBook;
exports.getById = getById;
exports.updateBook=updateBook;
exports.deleteBook=deleteBook;