// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === "POST") {
        const formData = req.body;
        console.log("formData: ", formData);
        // You can process the formData and save it to a database or perform other actions here
        res.status(200).json({ message: "Form submission successful!" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
