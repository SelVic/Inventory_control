let state =0;

export default function updateState(state, action) {
    if (action === "INCREMENT"){
        return state + 1
    }
    else if (action ==="DECREMENT"){
        return state - 1
    }else
        return state;
}

state = updateState(state, "INCREMENT")
console.log(state)

state = updateState(state, "DECREMENT")
console.log(state)

state = updateState(state, "NOTHING")
console.log(state)