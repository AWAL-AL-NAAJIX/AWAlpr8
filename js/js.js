let container_box = document.querySelector(".jscontant")
container_box.innerHTML = ""

let add_btn = document.querySelector(".add")

let taks = [
    {
        "tital":"Awal",
        "date":"07/26/2023",
        "isDon":true
    },
    {
        "tital":"Al-naajix",
        "date":"07/26/2023",
        "isDon":false
    },
    {
        "tital":"Al-xirsaawi",
        "date":"07/26/2023",
        "isDon":false
    }
]

function readViwelocalStorage(){
    let changeToobject = JSON.parse(localStorage.getItem("taks"))
    taks = changeToobject ?? []
}

readViwelocalStorage()
function readViwe(){
    container_box.innerHTML = ""
    let index = 0
    for (element of taks){
        let content = 
        `
            <div class="container-box-contant ${element.isDon ? `don` : ``}">
                <!--  text div -->
                <div class="text">
                    <h4>${element.tital}</h4>
                    <span>
                        ${element.date}
                    </span>
                </div>
                <!-- //  text div -->
                <!--  edit,delete and select div -->
                <div class="btt">
                    <button class="edit" onclick="UpdateTassk(${index})"><i class="fa-solid fa-pen"></i></button>
                    <button id="select" class="select ${element.isDon ? `don` : ``}" onclick="completTask(${index})">${element.isDon ? `<i class="fa-solid fa-xmark" style="color: #ffffff;"></i>` : `<i class="fa-solid fa-check"></i>`}</button>
                    <button class="delete" onclick="deleteTassk(${index})"><i class="fa-solid fa-trash"></i></button>
                </div>
                <!--  // edit,delete and select div -->
            </div>
        `
        container_box.innerHTML += content
        index++
    }
}

readViwe()



add_btn.addEventListener("click", () => {
    const date = new Date()
    const finalDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    const finalTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const finalDateandTime = `${finalDate}:${finalTime} `
    let mshinName = prompt("Please Enter The Mission")
    // console.log(mshinName)
    // console.log(finalDateandTime)
    if(mshinName != null && mshinName != "" && mshinName != " "){
        let newObject = {
            "tital":`${mshinName}`,
            "date":`${finalDateandTime}`,
            "isDon":false
        }
        taks.push(newObject)
        storLocalStorage()
        readViwe()
    }
})


function deleteTassk(index){
    // alert(index)
    let x = confirm(`Did you want to delete this ${taks[index].tital}`)
    if(x == true){
        alert(`${taks[index].tital} is deleded successfully`)
        taks.splice(index,1)
        storLocalStorage()
        readViwe()
    }
}

function UpdateTassk(index){
    let mshinName = prompt("Please Enter The New Mission",`${taks[index].tital}`)
    if(mshinName != null && mshinName != "" && mshinName != " "){
        taks[index].tital=mshinName
        storLocalStorage()
        readViwe()
    }
}

function completTask(index){
    taks[index].isDon = !taks[index].isDon 
    storLocalStorage()
    readViwe()
}




function storLocalStorage(){
    let storeLocal = JSON.stringify(taks)
    localStorage.setItem("taks",storeLocal)
}