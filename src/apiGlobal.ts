export const GlobalVariable = Object.freeze({
    BASE_API_URL: 'http://localhost:7090/api/',
    IMAGES_API_URL:"http://localhost:7090/images",
    LOGIN:"admin-auth/login",
    GET_RESTAURANTS:"admin/restaurants",
    REGISTER:"admin-auth/register",
    GET_ORDER_TODAY:"partner_order/getOrder_today/",
    GET_ORDER_ALL:"partner_order/getOrder_all/",
    GET_ORDER_DETAIL:"partner_order/get_order_detail/",
    GET_REVIEW:"reviews/getAll/",
    DELETE_REVIEW:"reviews/delete/",
    GET_ORDER_PENDING:"partner_order/get-order-pending/",
    GET_ORDER_WAITING:"partner_order/get-order-waiting/",
    UPDATE_ORDER_STATUS:"partner_order/update_order_status/",
    FOOD:"food/getAllFoods",
    ORDER_CANCEL:"orders/cancel-order",
    ORDER_DELETE:"orders/delete-order/",
    INSERT_CATEGORY:"CategoriesRestaurants/insert-category",
    GET_CATEGORY:"CategoriesRestaurants/getAllCatRes/",
    GET_CATEGORY_BY_ID:"CategoriesRestaurants/get-cate-by-id/",
    UPDATE_CATEGORY:"CategoriesRestaurants/update-category"
    //... more of your variables
});