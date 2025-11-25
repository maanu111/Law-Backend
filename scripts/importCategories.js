const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const FormCategory = require("../models/formCategoryModel"); // Adjust path based on your folder structure

// Replace with your MongoDB connection string
// You can also use process.env.MONGO_URI if you have it in .env file
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://himanshu:himanshu111@lawfirm.8dmtmwt.mongodb.net/";

// Path to your CSV file
const CSV_FILE_PATH = "./scripts/FORM_CATG.csv";

async function importCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const categories = [];

    // Read CSV file
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on("data", (row) => {
        // Map CSV columns to database fields
        // Adjust column names if your CSV headers are different
        categories.push({
          catg_id: (row.CATG_ID || row.catg_id || "").trim().toUpperCase(),
          catg_desc: (row.CATG_DESC || row.catg_desc || "").trim(),
          last_user_id: (
            row.LAST_USER_ID ||
            row.last_user_id ||
            "system"
          ).trim(),
        });
      })
      .on("end", async () => {
        console.log(`📄 Read ${categories.length} categories from CSV`);

        try {
          // Option 1: Clear existing categories first (uncomment if you want to replace all)
          // await FormCategory.deleteMany({});
          // console.log("🗑️  Cleared existing categories");

          // Option 2: Insert all categories (skips duplicates automatically)
          const result = await FormCategory.insertMany(categories, {
            ordered: false, // Continue inserting even if some duplicates exist
          });
          console.log(`✅ Successfully imported ${result.length} categories`);

          // Show all imported categories
          const allCategories = await FormCategory.find({}).sort({
            catg_id: 1,
          });
          console.log("\n📋 All Categories in Database:");
          allCategories.forEach((cat) => {
            console.log(`  ${cat.catg_id} - ${cat.catg_desc}`);
          });
        } catch (error) {
          if (error.code === 11000) {
            console.log(
              "⚠️  Some categories already exist (duplicates skipped)"
            );
            console.log(
              `   Successfully imported ${
                categories.length - error.writeErrors?.length || 0
              } new categories`
            );
          } else {
            console.error("❌ Error importing categories:", error.message);
          }
        } finally {
          await mongoose.connection.close();
          console.log("\n🔌 Database connection closed");
          process.exit(0);
        }
      })
      .on("error", (error) => {
        console.error("❌ Error reading CSV file:", error.message);
        console.error("   Make sure the CSV file exists at:", CSV_FILE_PATH);
        process.exit(1);
      });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("   Check your MONGO_URI connection string");
    process.exit(1);
  }
}

// Run the import
console.log("🚀 Starting CSV import...");
console.log("📁 CSV file path:", CSV_FILE_PATH);
console.log(
  "🔗 MongoDB URI:",
  MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@")
); // Hide password in logs
console.log("");

importCategories();
