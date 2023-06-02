import express from "express";

import shopify from "../shopify.js";

import { getFunnels } from "../helpers/funnels.js";

export default function applyFunnelsApiEndpoints(app) {
  app.use(express.json());

  app.get("/api/funnels", async (req, res) => {
    try {
      const response = await getFunnels(req, res);
      // console.log("RESP_funnels-api", response);
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
}
