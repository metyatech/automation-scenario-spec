const Ajv = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const fs = require("fs");
const glob = require("glob");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const schemaPath = "schema/scenario.schema.json";

try {
  const schemaContent = fs.readFileSync(schemaPath, "utf8");
  const schema = JSON.parse(schemaContent);
  const validate = ajv.compile(schema);

  const files = glob.sync("examples/*.json");
  let hasError = false;

  if (files.length === 0) {
    console.log("No example files found to validate.");
  }

  files.forEach((file) => {
    try {
      const dataContent = fs.readFileSync(file, "utf8");
      const data = JSON.parse(dataContent);
      const valid = validate(data);
      if (!valid) {
        console.error(`\nValidation failed for ${file}:`);
        console.error(validate.errors);
        hasError = true;
      } else {
        console.log(`Validation passed for ${file}`);
      }
    } catch (err) {
      console.error(`Error reading/parsing ${file}: ${err.message}`);
      hasError = true;
    }
  });

  if (hasError) {
    process.exit(1);
  }
} catch (err) {
  console.error(`Error loading schema: ${err.message}`);
  process.exit(1);
}
