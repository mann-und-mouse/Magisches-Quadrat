CreateNumberGrid();
CreateSquareGrid();
function CreateSquareGrid()
{
     
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            let field = document.createElement("div");
            field.id = i.toString() + j;
            field.setAttribute("class", "smallsquareField");
            field.value = "0";
            if (i == 3 || j == 3)
            {
                field.setAttribute("class", "smallsquareField squareEdge");
                field.textContent = field.value;
            }
            else
            {
                field.addEventListener("drop", OnDrop);
                field.addEventListener("dragover", OnDragOver);
            }
            $("#square").append(field);

        }
    }
            $("#33").text("");
}

function OnDragStart(event){
    let parent = event.target.parentElement;
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.effectAllowed = "move";
     event.target.parentElement.value = 0;
    if (parent.id.length > 1)
    {
        UpdateColumn(parent.id[1]);
        UpdateRow(parent.id[0]);
    }
}
function OnDragEnd(event)
{
        let parent = event.target.parentElement;
    if (event.dataTransfer.dropEffect == "none" && parent.classList.contains("smallsquareField"))
    {
        event.target.parentElement.value = event.target.id;
        UpdateRow(parent.id[0]);
        UpdateColumn(parent.id[1]);
    }
}
function OnDragOver(event)
{
    event.preventDefault();
}

function OnDrop(event)
{
    event.preventDefault();
    let id = event.dataTransfer.getData("text/plain");
    let element = document.getElementById(id);
    let parent = element.parentElement;
    if (event.target.classList.contains("numberSquare") == false)
    {
        event.target.value = id;
        event.target.appendChild(element);
        parent.value = 0;
        UpdateRow(event.target.id[0]);
        UpdateColumn(event.target.id[1]);
    }
    else
    {
        event.target.parentElement.appendChild(element);
        event.target.parentElement.value = element.id;
        parent.appendChild(event.target);
        parent.value = event.target.id;
        UpdateRow(element.parentElement.id[0]);
        UpdateColumn(element.parentElement.id[1]);
        if (parent.id.length > 1)
        {
        UpdateRow(parent.id[0]);
        UpdateColumn(parent.id[1]);

        }
    }
}
function UpdateRow(x)
{
    let sum = 0;
    let fullRowCounter = 0;
    let resultSquare = document.getElementById(x.toString() + 3);
    for (let i = 0; i < 3; i++)
    {
        sum += + document.getElementById(x.toString() + i).value;
        if (document.getElementById(x.toString() + i).value != 0)
        {
            fullRowCounter++;
        }
    }
    if (sum == 15 && fullRowCounter == 3)
    {
        resultSquare.style.backgroundColor = "darkorange";
    }
    else (
        resultSquare.style.backgroundColor = "grey"
    )
    resultSquare.textContent = sum;
}
function UpdateColumn(y)
{
    let sum = 0;
    let fullColumnCounter = 0;
    let resultSquare = document.getElementById(3 + y.toString());
    for (let i = 0; i < 3; i++)
    {
        sum += + document.getElementById(i + y.toString() ).value;
        if (document.getElementById(i + y.toString()).value != 0)
        {
            fullColumnCounter++;
        }
    }
    if (sum == 15 && fullColumnCounter == 3)
    {
        resultSquare.style.backgroundColor = "darkorange";
    }
    else 
        resultSquare.style.backgroundColor = "grey"
    document.getElementById(3 + y.toString() ).textContent = sum;
}
function CreateNumberGrid()
{
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            let field = document.createElement("div");
            field.setAttribute("class", "smallgridField");
            $("#numbers").append(field);

            let numberSquare = document.createElement("div");
            numberSquare.setAttribute("class", "numberSquare");
            numberSquare.id = 3 * i + j + 1;
            numberSquare.textContent = numberSquare.id;
            numberSquare.setAttribute("draggable", "true");
            numberSquare.addEventListener("dragstart", OnDragStart);
            numberSquare.addEventListener("dragend", OnDragEnd);
            field.appendChild(numberSquare);
        }
    }
}