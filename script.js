document.addEventListener('click', (event) => {
    let targetId = event.target.id;

    if(document.getElementById("clSearchDd").contains(event.target)){
        switch(targetId){
            case 'mt4GroupMinBtnCurrency':
            case 'mt4GroupMaxBtnCurrency':
                toggleGroup("currency");
            break;
            case 'mt4GroupMinBtnStocks':
            case 'mt4GroupMaxBtnStocks':
                toggleGroup("stocks");
            break;
            case 'mt4GroupMinBtnIndices':
            case 'mt4GroupMaxBtnIndices':
                toggleGroup("indices");
            break;
            case 'mt4GroupMinBtnCommodities':
            case 'mt4GroupMaxBtnCommodities':
                toggleGroup("commodities");
            break;
            case 'searchWrapper':
                //do nothing
                break;
            // open/close dropdown
            case 'mt4sEl':
                toggleSymbols();
                break;
            // option item
            case '':
                // update input with user selected option item
                document.getElementById("mt4SymbolSearch").value = event.target.innerHTML;
                // update selected symbol name
                document.getElementById("mt4sSelectedSymbol").value = event.target.dataset.symbolname;
                updateFilter();
                closeSymbols();
                CalculateCurrentMt4Price();
                break;
            // search input
            case 'mt4SymbolSearch':
                openSymbols();
                break;
            // group title
            default:
                toggleGroup(targetId);
                break;
        }
    }else{
        // Out off component scop
        closeSymbols();
    }
});
// close dropdown
function closeSymbols(){
    document.getElementById("mt4Symbols").classList.add("hide");
}
// open dropdown
function openSymbols(){
    document.getElementById("mt4Symbols").classList.remove("hide");
}
//toggle dropdown
function toggleSymbols(){
    document.getElementById("mt4Symbols").classList.toggle("hide");
}
// toggle group
function toggleGroup(selectedGroup){
    document.getElementById("mt4sGroup-" + selectedGroup).classList.toggle("hide");
    // toggle min/max btn
    document.getElementById(selectedGroup).classList.toggle("min");
}
// filter dropdown option items
function updateFilter(){
    let filterStr = document.getElementById("mt4SymbolSearch").value.toLowerCase();
    let groups = document.getElementsByClassName("mt4sGroup");

    for(let gi=0; gi < groups.length; gi++){
        //if empty searc string.. show group
        if(filterStr === ""){
            groups[gi].classList.remove("hide");
        }
    
        // filter items
        let optionItems = groups[gi].getElementsByClassName("mt4sOption");
        for(let i=0; i<optionItems.length;i++){
            if(filterStr === ""){// show item
                optionItems[i].style.display = "block";
            }else if(optionItems[i].innerHTML.toLowerCase() == filterStr.toLowerCase()){// exact match show item
                optionItems[i].style.display = "block";
                CalculateCurrentMt4Price();
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
