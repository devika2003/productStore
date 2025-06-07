// import express from "express";
// import dotenv from "dotenv";
// import path from "path"
// import { connectDB } from "./config/db.js";
// import Product from "./models/product.js";
// import productRoutes from "./routes/product.route.js";
// //import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();
// const app=express();
// app.use(express.json());
// const PORT=process.env.PORT || 5000
// //const __dirname = path.resolve();
// //process.env.NODE_ENV = process.env.NODE_ENV || "production";

// // if(process.env.NODE_ENV==="production"){
// //     app.use(express.static(path.join(__dirname,"/frontend/dist")))
// //     app.get("*",(req,res)=>{
// //         res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
// //     })
// // }
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "frontend", "dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// app.use("/api/products",productRoutes);
// console.log(process.env.MONGO_URI);
// app.listen(PORT,()=>{
//     connectDB()
//     console.log("server started at 5000");
// });
// //pass
// //mongodb+srv://root:<db_password>@cluster0.twdfzje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// 


// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js";
// import { fileURLToPath } from "url";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Fix for ES Modules (__dirname)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.json());
// app.use("/api/products", productRoutes);
// console.log("Registering /api/products route...");

// // ✅ Carefully wrap this
// if (process.env.NODE_ENV === "production") {
// 	try {
// 		const frontendPath = path.join(__dirname, "/frontend/dist");
// 		app.use(express.static(frontendPath));

// 		app.get("*", (req, res) => {
// 			res.sendFile(path.resolve(frontendPath, "index.html"));
// 		});
// 	} catch (err) {
// 		console.error("Static file serving failed:", err.message);
// 	}
// }

// app.listen(PORT, () => {
// 	connectDB();
// 	console.log(`Server started on http://localhost:${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});