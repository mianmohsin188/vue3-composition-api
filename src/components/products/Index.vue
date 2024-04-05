<template>
  <div class="row g-3 mb-4 align-items-center justify-content-between">
    <div class="col-auto">
      <h1 class="app-page-title mb-0">Products <a class="" @click="products=[];getProducts();" href="javascript:void(0)"><svg fill="#FFFFFF" height="1.2em" width="1.2em" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-117.53 -117.53 724.76 724.76" xml:space="preserve" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-117.53" y="-117.53" width="724.76" height="724.76" rx="21.7428" fill="#15a362" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M468.999,227.774c-11.4,0-20.8,8.3-20.8,19.8c-1,74.9-44.2,142.6-110.3,178.9c-99.6,54.7-216,5.6-260.6-61l62.9,13.1 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-123.7-26c-7.2-1.7-26.1,3.5-23.9,22.9l15.6,124.8 c1,10.4,9.4,17.7,19.8,17.7c15.5,0,21.8-11.4,20.8-22.9l-7.3-60.9c101.1,121.3,229.4,104.4,306.8,69.3 c80.1-42.7,131.1-124.8,132.1-215.4C488.799,237.174,480.399,227.774,468.999,227.774z"></path> <path d="M20.599,261.874c11.4,0,20.8-8.3,20.8-19.8c1-74.9,44.2-142.6,110.3-178.9c99.6-54.7,216-5.6,260.6,61l-62.9-13.1 c-10.4-2.1-21.8,4.2-23.9,15.6c-2.1,10.4,4.2,21.8,15.6,23.9l123.8,26c7.2,1.7,26.1-3.5,23.9-22.9l-15.6-124.8 c-1-10.4-9.4-17.7-19.8-17.7c-15.5,0-21.8,11.4-20.8,22.9l7.2,60.9c-101.1-121.2-229.4-104.4-306.8-69.2 c-80.1,42.6-131.1,124.8-132.2,215.3C0.799,252.574,9.199,261.874,20.599,261.874z"></path> </g> </g> </g></svg></a> </h1>
    </div>
    <div class="col-auto">
      <div class="page-utilities">
        <div class="row g-2 justify-content-start justify-content-md-end align-items-center">
          <div class="col-auto">
            <form class="table-search-form row gx-1 align-items-center">
              <div class="col-auto ">
                <input type="search" @input="getProducts()" v-model.trim="search" id="search-orders" name="searchorders" class="m-1 form-control search-orders "
                       placeholder="Search">
              </div>
<!--              <div class="col-auto">
                <button type="submit" class="btn app-btn-secondary">Search</button>
              </div>-->
            </form>

          </div>
          <!--//col-->
<!--          <div class="col-auto">

            <select class="form-select w-auto">
              <option selected value="option-1">All</option>
              <option value="option-2">This week</option>
              <option value="option-3">This month</option>
              <option value="option-4">Last 3 months</option>

            </select>
          </div>-->
          <div class="col-auto">

            <a class="btn app-btn-secondary" @click="exportToCSV" href="#">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-download me-1" fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path fill-rule="evenodd"
                      d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Download CSV
            </a>
          </div>
        </div>
        <!--//row-->
      </div>
      <!--//table-utilities-->
    </div>
    <!--//col-auto-->
  </div><!--//row-->

  <div class="tab-content" id="orders-table-tab-content">
    <div class="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
      <div class="app-card app-card-orders-table shadow-sm mb-5">
        <div class="app-card-body">
          <div class="table-responsive">
            <table class="table app-table-hover mb-0 text-left">
              <thead>
              <tr>
                <th class="cell">Sr #</th>
                <th class="cell">Title</th>
                <th class="cell">Description</th>
                <th class="cell">Brand</th>
                <th class="cell">Category</th>
                <th class="cell">Price</th>
                <th class="cell">Rating</th>
                <th class="cell">Stock</th>
                <th class="cell">Discount Percentage</th>
                <th class="cell">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in products" :key="product.id">
                <td class="cell">{{product.id}}</td>
                <td class="cell">{{product.title}}</td>
                <td class="cell">{{product.description}}</td>
                <td class="cell"><span class="badge bg-success">{{product.brand}}</span></td>
                <td class="cell">{{product.category}}</td>
                <td class="cell">{{product.price}}</td>
                <td class="cell">{{product.rating}}</td>
                <td class="cell">{{product.stock}}</td>
                <td class="cell">{{product.discountPercentage}}</td>
                <td class="cell"><a class="btn-sm app-btn-secondary" href="#">View</a></td>
              </tr>


              </tbody>
            </table>
          </div>
          <!--//table-responsive-->

        </div>
        <!--//app-card-body-->
      </div>
      <!--//app-card-->
      <nav class="app-pagination">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
          </li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
      <!--//app-pagination-->

    </div>
    <!--//tab-pane-->




  </div><!--//tab-content-->
</template>
<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import Swal from "sweetalert2";
import HelperMixin from "../../global_helpers/HelperMixin.js";

document.title = 'Products'
name: 'Products'
const products = ref([]);
const search = ref('');

const getProducts = () => {

  let url = (search.value=='')? (import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_PRODUCTS_LIST_URL +'?limit=10') : (import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_PRODUCTS_LIST_URL + '/search?q=' + search.value +'&limit=10')
  axios.get(url).then(
      (response) => {
        products.value = response?.data?.products;
        console.log(products)
      }
  ).catch(
      (error) => {
        if(error?.code=="ERR_NETWORK"){
Swal.fire("Error", "Network Error!", "error");
        }
        else {
          Swal.fire("Error!", error?.response?.data?.message, "error");
        }
      }
  )
}
onMounted(()=>{
  getProducts();
})
 const exportToCSV=()=>{

  let csvData= HelperMixin.methods.convertJsonToCSV(products.value)
  if (csvData) {
    HelperMixin.methods.downloadCsv(csvData, 'products');
  }

}
</script>
<style scoped></style>