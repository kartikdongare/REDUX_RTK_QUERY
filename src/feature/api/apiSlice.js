
import { nanoid } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stdApi=createApi({
    reducerPath:"stdApi",
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:4000'}),
    tagTypes:['std'],
    endpoints:(builder)=>({
        getStd:builder.query({
            query:()=>({
                url:'/std-data'
            }),
            providesTags:['std']
        }),
        addStd:builder.mutation({
            query:(std)=>({
                url:'/std-data',
                method:'POST',
                body:{...std,id:nanoid(),std_id:nanoid()}
            }),
            invalidatesTags:['std']
        }),
        updateStd:builder.mutation({
            query:(std)=>{
                console.log(std,'stdddduoadte')
                return{
                url:`/std-data/${std.id}`,
                method:'PATCH',
                body:std
            }},
            invalidatesTags:['std']
        }),
        deleteStd:builder.mutation({
            query:(id)=>({
                url:`/std-data/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['std']
        })
    })
})

export const{useGetStdQuery,useUpdateStdMutation,useDeleteStdMutation,useAddStdMutation}=stdApi;
export default stdApi