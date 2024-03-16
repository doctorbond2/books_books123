import fs, { promises, read } from "fs";

export const readDataBaseFile = async (filePath) => {
  if (!filePath || typeof filePath !== "string") {
    throw new Error("No path provided");
  }
  try {
    const response = await promises.readFile(filePath, "utf-8");
    if (!response) {
      throw new Error("Error with response");
    }
    const data = await JSON.parse(response);
    console.log("DATA RECIEVED: ", data);
    return data;
  } catch (err) {
    console.log("Unexpected error: ", err);
    throw new Error("Check readDataBaseFile");
  }
};

export const writeDataBaseFile = async (filePath, newData) => {
  if (!filePath || typeof filePath !== "string") {
    throw new Error("No path provided");
  }
  if (!newData) {
    throw new Error("No data provided");
  }
  try {
    const data = JSON.stringify(newData, null, 2);
    await promises.writeFile(filePath, data, "utf-8");
    console.log("File updated successfully!");
  } catch (err) {
    console.log("Unexpected error: ", err);
    throw new Error("Check writeDataBaseFile");
  }
};
export const validateItem = (item) => {};
export const generateListId = (items) => {};
export const generateUUID = () => {};
