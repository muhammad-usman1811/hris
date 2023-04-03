import Document from "../models/documentModel.js";
import asyncHandler from "express-async-handler";
import upload from "./../config/multerConfig.js";
import multer from "multer";

// Description: Get all documents
// Route: GET/api/documents
// Access: private/admin
const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({});
  res.json(documents);
});

// Description: Upload a document
// Route: POST/api/documents/upload
// Access: private/admin
const uploadDocument = asyncHandler(async (req, res) => {
  //Using multer
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      //Multer error occurred while uploading
      return res.status(500).json({ message: "Error uploading file" });
    } else if (err) {
      //Unknown error
      return res.status(500).json({ message: "Error uploading file" });
    }
    const { filename } = req.file;
    const { filename: name } = req.body;

    //Saving in database
    const document = new Document({
      name: name,
      url: `/uploads/${filename}`,
    });

    document.save((err) => {
      if (err) {
        res.status(500);
        throw new Error("Error saving document");
      }
      return res.status(200).json({ message: "File uploaded successfully" });
    });
  });
});

// Description: Update a document
// Route: PUT/api/documents/:id
// Access: Private/Admin
const updateDocument = asyncHandler(async (req, res) => {
  const { name, url } = req.body;
  const document = await Document.findById(req.params.id);
  if (document) {
    document.name = name;
    document.url = url;

    await product.save();
    res.json({ message: "Document updated!" });
  } else {
    res.status(404);
    throw new Error("Document not found");
  }
});

// Description: Delete a document
// Route: Delete/api/documents/:id
// Access: Private/Admin
const deleteDocument = asyncHandler(async (req, res) => {
  const document = await Product.findById(req.params.id);
  if (document) {
    await document.remove();
    res.json({ message: "Product removed!" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getDocuments, uploadDocument, updateDocument, deleteDocument };
