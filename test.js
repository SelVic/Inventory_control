let testarray = [{name:"heyho",amount:345,id:7896,date:"11/11/2020","__v":0},{"_id":"5fabfe03bc1bc909a81d051c","name":"451F","amount":78,"id":34,"date":"11/11/2020","__v":0}]
//
// let arr = []
//
// // for (let i=0; i< testarray.length; i++){
// //     arr.push(testarray[i].name, testarray[i].amount, testarray[i].id)
// // }
arr = testarray.map(item => {
    return {name: item.name, amount: item.amount, id: item.id}
})
console.log(arr)

const createData = (name, amount, id, history) => {
    return {
        name,
        amount,
        id,
        history,
    };
}
const rows = [
    createData('Lord of the Rings', 159, 1000),
    createData('Мертвые души', 237, 2000 ),
]


console.log(rows)