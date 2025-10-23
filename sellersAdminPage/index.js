const price = document.getElementById("price");
const product = document.getElementById("product");
const category = document.getElementById("category");
const button = document.getElementById("btn");
const eleList = document.getElementById("eleList");
const foodList = document.getElementById("foodList");
const skinList = document.getElementById("skinList");


document.addEventListener("DOMContentLoaded", loadfullData);


button.addEventListener("click", function() {
  const Uprice = price.value.trim();
  const Uproduct = product.value.trim();
  const Ucategory = category.value.trim();

  if (Uprice === '' || Uproduct === '' || Ucategory==='') {
    alert('Enter all Data');
    return;
  }

  const detail = { Uprice, Uproduct, Ucategory };

  axios.post("https://68fa0ac5ef8b2e621e7e8c61.mockapi.io/seller/Api/v1/data", detail)
    .then((res) => {
      showToList(res.data);
    })
    .catch(error => console.log(error));
});

function showToList(fullData) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${fullData.Uprice} ${fullData.Uproduct} (${fullData.Ucategory})</span>`;

  // Create Delete Button
  const delButton = document.createElement("button");
  delButton.textContent = "Delete";
  delButton.addEventListener("click", function() {
    axios.delete(`https://68fa0ac5ef8b2e621e7e8c61.mockapi.io/seller/Api/v1/data/${fullData._id}`)
      .then(() => {
        li.remove(); // remove item from UI after successful delete
      })
      .catch(error => console.log(error));
  });

  li.appendChild(delButton); // Append button immediately

  // Append LI to correct category list
  if (fullData.Ucategory === "Electronic") eleList.appendChild(li);
  else if (fullData.Ucategory === "Food") foodList.appendChild(li);
  else skinList.appendChild(li);

  // Reset input fields
  price.value = "";
  product.value = "";
  category.value = "";
}

function loadfullData() {
  axios.get("https://68fa0ac5ef8b2e621e7e8c61.mockapi.io/seller/Api/v1/data")
    .then((response) => {
      // response.data contains all products
      response.data.forEach((item) => showToList(item));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
