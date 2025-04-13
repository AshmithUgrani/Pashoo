import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURl';

const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include',  // Corrected 'Credential' to 'credentials'
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || '',
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();
                return `/?${queryParams}`;  // Fixed template string
            },
            providesTags: ['Products'],
        }),

        fetchProductById: builder.query({  // Added this correctly
            query: (id) => `/${id}`,  // Fixed template string
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),

        addProduct: builder.mutation({  // Fixed 'AddProduct' to 'addProduct' and changed to mutation
            query: (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,  // Removed the quotes around "newProduct" which were incorrect
                credentials: "include",  // Corrected 'Credentials' to 'credentials'
            }),
            invalidTags: ['Products'],
        }),

        fetchRelatedProducts: builder.query({
            query: (id) => `/related/${id}`,
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-product/${id}`,  // Fixed typo from 'upadte-product' to 'update-product'
                method: "PATCH",
                body: rest,
                credentials: "include",
            }),
            invalidTags: ["Products"],
        }),

        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "DELETE",  // Changed to "DELETE" for the delete operation
                credentials: "include",
            }),
            invalidTags: (result, error, id) => [{ type: "Products", id }],
        }),
    }),
});

export const { 
    useFetchAllProductsQuery, 
    useFetchProductByIdQuery, 
    useAddProductMutation,
    useFetchRelatedProductsQuery,
    useUpdateProductMutation, 
    useDeleteProductMutation 
} = productsApi;

export default productsApi;
