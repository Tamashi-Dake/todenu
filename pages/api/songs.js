import clientPromise from "../../lib/mongodb";

export default async function handler(req, res){
    // export default async function getServerSideProp(req, res) {
   try {
       const client = await clientPromise;
       const db = client.db("Cluster0");

       const songs = await db
           .collection("songs")
           .find({})
           .sort({ title: -1 })
           .limit(10)
           .toArray();

        //    can not use return
       res.json(songs);
   } catch (e) {
       console.error(e);
   }
};

// export async function getServerSideProps() {
//     try {
//         const client = await clientPromise;
//         const db = client.db("Cluster0");

//         const songs = await db
//             .collection("songs")
//             .find({})
//             .sort({ title: -1 })
//             .limit(20)
//             .toArray();

//         return {
//             props: { songs: JSON.parse(JSON.stringify(songs)) },
//         };
//     } catch (e) {
//         console.error(e);
//     }
// }
