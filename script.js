
let selectedGroups = [];

document.addEventListener('click', (event) => {
    let targetId = event.target.id;

    if(document.getElementById("clSearchDd").contains(event.target)){
        switch(targetId){
            case 'searchWrapper':
                //do nothing
                break;
            case 'mt4sEl':
                //toggel symbols display
                //updateFilter();
                toggleSymbols();
                break;
            case '':// option item
                // update input with user selected option item
                document.getElementById("mt4SymbolSearch").value = event.target.innerHTML;
                // update selected symbol name
                console.log(event.target.dataset.symbolname);
                document.getElementById("mt4sSelectedSymbol").value = event.target.dataset.symbolname;
                closeSymbols();
                CalculateCurrentMt4Price();
                break;
            case 'mt4SymbolSearch':// search input
                openSymbols();
                //updateFilter();
                break;
            default:// group title
                toggleGroup(targetId);
                break;
        }
    }else{
        // Out
        //closeAllGroups();
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

function closeAllGroups(){
    let groups = document.getElementsByClassName("mt4sGroup");
    for(let i=0; i<groups.length;i++){
        groups[i].classList.add('hide');
    }
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
    let optionItems = document.getElementsByClassName("mt4sOption");
    let tmpSelectedGroups = [];

    for(let i=0; i<optionItems.length;i++){
        let groupObj = optionItems[i].parentElement;
        let currentGroup = groupObj.id.replace("mt4sGroup-", "");
        
        if(selectedGroups.length != 0){
            // show only item off open groups
            if(selectedGroups.indexOf(currentGroup) === -1){
                continue;
            }
        }


        if(filterStr != "" && optionItems[i].innerHTML.toLowerCase().indexOf(filterStr.toLowerCase()) == -1){//hide
            optionItems[i].style.display = "none";
        }else{
            // show item
            optionItems[i].style.display = "block";
            // show group
            groupObj.classList.remove("hide");
            // update selected arr
            if(tmpSelectedGroups.indexOf(currentGroup) === -1){
                tmpSelectedGroups.push(currentGroup);
            }
            //update selected symbol name
            if(optionItems[i].innerHTML.toLowerCase() === filterStr.toLowerCase()){
                console.log(optionItems[i].dataset.symbolname);
                document.getElementById("mt4sSelectedSymbol").value = optionItems[i].dataset.symbolname;
                CalculateCurrentMt4Price();
            }else{
                document.getElementById("mt4sSelectedSymbol").value = "";
                CalculateCurrentMt4Price();
            }
        }
    }
        selectedGroups = tmpSelectedGroups;
}

function CalculateCurrentMt4Price(){
    console.log("updateSelected()");
}
