const faunadb = require("faunadb"), q = faunadb.query;
require('dotenv').config();

var client = new faunadb.Client({ secret: process.env.FAUNA });

async function run() {
    
    // const results= await client.query(
    //     q.Update(q.Ref(q.Collection("todos"),"282069353350824451"),{
    //         data: {
    //             done: true
    //         }
    //     })
    // );

    const results = await client.query(
        q.Paginate(q.Match(q.Index("todos_by_user"),"user-test"))
    );

    console.log(results);
    // const results = await client.query(
    //     q.Create(q.Collection("todos"),{
    //         data: {
    //             text: "third",
    //             done: false,
    //             owner: "user-test-2"
    //         }
    //     })
    // );
    //console.log(results.ref.id);
}

run();