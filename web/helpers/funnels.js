import axios from "axios";
// import shopify from "../shopify.js";

export async function getFunnels(req, res, checkDomain = true) {
  try {
    const funnels = await axios.get("http://localhost:1337/api/funnels/");
    console.log("FUNNELS_getFunnels", funnels);
    if (
      response === undefined ||
      (checkDomain &&
        (await getShopUrlFromSession(req, res)) !== response.shopDomain)
    ) {
      res.status(404).send();
    } else {
      return funnels;
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getShopUrlFromSession(req, res) {
  return `https://${res.locals.shopify.session.shop}`;
}
