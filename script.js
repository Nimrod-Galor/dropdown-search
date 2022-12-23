
let selectedGroups = ["currency", "stocks", "indices", "commodities"];

document.addEventListener('click', (event) => {
    let targetId = event.target.id;

    if(document.getElementById("clSearchDd").contains(event.target)){
        switch(targetId){
            case 'searchWrapper':
                //do nothing
                break;
            case 'mt4sEl':
                //toggel symbols display
                toggleSymbols();
                break;
            case '':// option item
                // update input with user selected option item
                document.getElementById("mt4SymbolSearch").value = event.target.innerHTML;
                // update selected symbol name
//console.log(event.target.dataset.symbolname);
                document.getElementById("mt4sSelectedSymbol").value = event.target.dataset.symbolname;
                updateFilter();
                closeSymbols();
                CalculateCurrentMt4Price();
                break;
            case 'mt4SymbolSearch':// search input
                openSymbols();
                break;
            default:// group title
                toggleGroup(targetId);
                break;
        }
    }else{
        // Out off component scop
        closeSymbols();
    }
});

function closeSymbols(){
    document.getElementById("mt4Symbols").classList.add("hide");
}

function openSymbols(){
    document.getElementById("mt4Symbols").classList.remove("hide");
}

function toggleSymbols(){
    document.getElementById("mt4Symbols").classList.toggle("hide");
}

function toggleGroup(selectedGroup){
    document.getElementById("mt4sGroup-" + selectedGroup).classList.toggle("hide");
    // update selected group arr
    let gindex = selectedGroups.indexOf(selectedGroup);
    if(gindex === -1){
        selectedGroups.push(selectedGroup);
    }else{
        selectedGroups.splice(gindex, 1);
    }
}

function updateFilter(){
    let filterStr = document.getElementById("mt4SymbolSearch").value.toLowerCase();
    let groups = document.getElementsByClassName("mt4sGroup");

    for(let gi=0; gi < groups.length; gi++){
        //if empty searc string.. show group
        if(filterStr === ""){
            groups[gi].classList.remove("hide");
            let currentGroup = groups[gi].id.replace("mt4sGroup-", "");
            if(selectedGroups.indexOf(currentGroup) === -1){
                selectedGroups.push(currentGroup);
            }
        }
    
        // filter items
        let optionItems = groups[gi].getElementsByClassName("mt4sOption");
        for(let i=0; i<optionItems.length;i++){
            if(filterStr === ""){// show item
                optionItems[i].style.display = "block";
            }else if(optionItems[i].innerHTML.toLowerCase().indexOf(filterStr.toLowerCase()) != -1){// show item
                optionItems[i].style.display = "block";
            }else{// hide item
                optionItems[i].style.display = "none";
            }
        }
    }
}

function CalculateCurrentMt4Price(){
    console.log("CalculateCurrentMt4Price()");
}
