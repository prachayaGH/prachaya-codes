import express from "express";
import { getPostsFields } from "../model/postModel.mjs";

const validatePostBody = async (req, res, next) => {
  try {
    const requireFields = await getPostsFields();
    const body = req.body;

    const missingFields = [];
    const invalidTypeFields = [];
    for (const [field, dbtype] of Object.entries(requireFields)) {
      if (["id", "date", "likes_count"].includes(field)) {
        continue;
      }
      const value = body[field];
      if (value === undefined || value === null || value === "") {
        missingFields.push(field);
      } else {
        if (["character varying", "text"].includes(dbtype)) {
          if (typeof value !== "string") {
            invalidTypeFields.push(`${field} must be a string`);
          }
        } else if (
          ["integer", "numeric", "bigint", "smallint"].includes(dbtype)
        ) {
          if (typeof value !== "number" || isNaN(value)) {
            invalidTypeFields.push(`${field} must be a number`);
          }
        }
      }
    }

    if (missingFields.length > 0 || invalidTypeFields.length > 0) {
        return res.status(400).json({
            message: "Invalid request body",
            missingFields: missingFields.length > 0 ? missingFields : undefined,
            invalidTypeFields: invalidTypeFields.length > 0 ? invalidTypeFields : undefined,
        })
    }
  } catch (error) {
    return res.status(500).json({
      message:
        "Server could not validate post body because database connection",
      error: error.message,
    });
  }
  next();
};

export default validatePostBody;
