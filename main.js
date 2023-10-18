// alert("Hola");
const addItem = document.getElementById("itemsForm");
const name = document.getElementById("name");
const weight = document.getElementById("weight");
const price = document.getElementById("price");
const items = document.querySelector("#data");
const url = "http://localhost:3000/items";

// Get request
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data);
    if (data.data.length > 0) {
      let item = "";
      data.data.forEach((itemData) => {
        item += "<tr>";
        item += "<td>" + itemData.name + "</td>";
        item += "<td>" + itemData.weight + "</td>";
        item += "<td>" + itemData.price + "</td>";
        item += `<td> <a href="#" data-id="${itemData.id}" id="editBtn" class="fa-regular fa-pen-to-square" style="color: grey;"></a>  </td>`;
        item += `<td> <a href="#" data-id="${itemData.id}" id="deleteBtn" class="deleteBtn fa-solid fa-trash" style="color: grey;"></a>  </td>`;
        ("</tr>");
      });

      document.getElementById("data").innerHTML = item;
    }
  });

// Post request
// console.log(additem);
addItem.addEventListener("submit", (button) => {
  button.preventDefault();
  if (!name.value || !price.value || !weight.value) {
    alert("Please fill all fields before submitting!");
    return;
  }
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      weight: weight.value,
      price: price.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  // alert("Item Added Successfully. Refresh page");
});
document.getElementById("itemsForm").onsubmit = function () {
  location.reload(true);
};

// DELETE REQUEST

items.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deleteBtn")) {
    const itemId = e.target.getAttribute("data-id");

    fetch(`${url}/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Item with id ${itemId} deleted successfully.`);
        } else {
          console.error(`Failed to delete item with id ${itemId}.`);
        }
        console.log("Item Deleted Successfully! Refresh Page");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.alert("Item Deleted Successfully!\nRefresh Page");
    // document.getElementById("deleteBtn").onclick = function () {
    //   location.reload(true);
    // };
  }
});

// PUT REQUEST

const editingForm = document.getElementById("itemsForm");

items.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id === "editBtn") {
    const itemId = e.target.getAttribute("data-id");

    fetch(`${url}/${itemId}`)
      .then((res) => res.json())
      .then((itemData) => {
        console.log("Fetched item data:", itemData);
        name.value = itemData.data.name;
        weight.value = itemData.data.weight;
        price.value = itemData.data.price;
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });

    if (editingForm) {
      editingForm.classList.add("visible");
    }

    if (editingForm) {
      editingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedData = {
          name: name.value,
          weight: weight.value,
          price: price.value,
        };

        fetch(`${url}/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        if (editingForm) {
          editingForm.classList.remove("visible");
        }
      });
    }
  }
});
