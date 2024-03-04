import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  // const product = products.find((product) => product.id === id);

  if (request.method === "GET") {
    const activity = await Activity.findById(id);

    if (!activity) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(activity);
  }
}