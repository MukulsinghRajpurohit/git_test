const expenseForm = document.getElementById("expenseForm");
const expenseTable = document.getElementById("expenseTable");
const remainingAmountCell = document.getElementById("remainingAmount");
const fixedAmountInput = document.getElementById("fixedAmount");
const downloadButton = document.createElement("button"); // Create the download button element
downloadButton.classList.add("download-button");

document.getElementById("logoutButton").addEventListener("click", function() {
    // Redirect to the login page
    window.location.href = "login.html";
});

// Variable to store the fixed amount
let fixedAmount;

// Add an event listener to the form
expenseForm.addEventListener("submit", function(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Get the expense name, amount, date
    const expenseName = document.getElementById("expenseName").value;
    const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
    const expenseDate = document.getElementById("expenseDate").value;

    // If the amount is not valid, return early
    if (isNaN(expenseAmount)) {
        alert("Please enter a valid expense amount.");
        return;
    }

    // Check if the fixed amount has been set
    if (fixedAmount === undefined) {
        // Get the fixed amount and validate it
        fixedAmount = parseFloat(fixedAmountInput.value);

        // If the fixed amount is not valid, return early
        if (isNaN(fixedAmount)) {
            alert("Please enter a valid fixed amount.");
            return;
        }

        // Disable the fixed amount input
        fixedAmountInput.disabled = true;
    }

    // Deduct the expense amount from the fixed amount
    fixedAmount -= expenseAmount;

    // If the remaining amount is negative or zero, show an alert and enable the fixed amount input
    if (fixedAmount <= 0) {
        alert("Fixed amount reached or exceeded. No more expenses can be added.");
        fixedAmountInput.disabled = false;
        fixedAmountInput.value = "";
        fixedAmount = undefined;
    }

    // Add the expense to the table
    const newRow = expenseTable.insertRow(-1);
    const dateCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const amountCell = newRow.insertCell(2);
    const deleteCell = newRow.insertCell(3); // Add a cell for the delete button
    dateCell.textContent = expenseDate;
    nameCell.textContent = expenseName;
    amountCell.textContent = expenseAmount.toFixed(2);

    // Create a delete button and add it to the delete cell
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteCell.appendChild(deleteButton);

    // Add event listener to the delete button
    deleteButton.addEventListener("click", function() {
        // Remove the row from the table
        expenseTable.deleteRow(newRow.rowIndex);

        // Add the deleted amount back to the fixed amount
        fixedAmount += expenseAmount;

        // Update the total expense
        const totalExpenseCell = document.getElementById("totalExpense");
        const currentTotalExpense = parseFloat(totalExpenseCell.textContent);
        totalExpenseCell.textContent = (currentTotalExpense - expenseAmount).toFixed(2);

        // Update the remaining amount
        remainingAmountCell.textContent = fixedAmount.toFixed(2);
    });

    // Update the total expense
    const totalExpenseCell = document.getElementById("totalExpense");
    const currentTotalExpense = parseFloat(totalExpenseCell.textContent);
    totalExpenseCell.textContent = (currentTotalExpense + expenseAmount).toFixed(2);

    // Update the remaining amount
    remainingAmountCell.textContent = fixedAmount.toFixed(2);

    // Reset the form inputs
    expenseForm.reset();
});



// Add event listener to the download button
downloadButton.addEventListener("click", function() {
    const tableData = expenseTable.outerHTML.replace(/ /g, "%20");
    const filename = "expense_table.html";
    const downloadLink = document.createElement("a");
    downloadLink.href = "data:text/html;charset=UTF-8," + tableData;
    downloadLink.download = filename;
    downloadLink.click();
});

// Add the download button to the page
downloadButton.textContent = "Download Table";
document.body.appendChild(downloadButton);
