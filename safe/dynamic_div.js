   let newDiv = document.createElement("div");
          newDiv.setAttribute("class", "actionBtn w-1/5 md:w-1/3 lg:w-1/5 bg-white rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer border border-gray-300 m-2 p-5");
        
        newDiv.addEventListener("click", function() {
        const selectedBusinessId = this.getAttribute("data-selectedBusinessId");
 
        document.cookie = `selectedBusinessTypeId=${businessItem.businessTypeId}`;
        document.cookie = `selectedRegionId=${regionId}`;
        // console.log("selectedBusinessId", selectedBusinessId);
        window.location.href = 'http://localhost/businessPage';
        });


        
          cardsDiv.appendChild(newDiv);
