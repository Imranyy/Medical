// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import search from "../../db/search.json";

export default async function handler(req, res) {
  if(req.method==='POST'){
    try {
      res.status(200).json({
        mess:'it okay',
        output:search
      })
    } catch (error) {
      res.status(400).json({msg:"Bad Request, Try again!"})
    }
  }
}
