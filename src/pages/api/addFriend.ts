import { NextApiRequest, NextApiResponse } from "next";

export default function addFriend(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { email } = req.body;
      console.log(email, "from server");
      return res.status(200).json({ email: email });
    }
  } catch (error) {
    console.log(error);
  }
}
