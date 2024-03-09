import apiData from '../../api.json';

export const config = [
    {
        accessor: 'name',
        header: "Name",
        isSortable: true,
    },
    {
        accessor: 'category',
        header: "Category",
        isSortable: true,
    }, 
    {
        accessor: 'description',
        header: "Description",
        isSortable: true,
    }, 
    {
        accessor: 'expiry',
        header: "Expiry",
        isSortable: true,
    }, 
    {
        accessor: 'Selling Price',
        header: "sp",
        isSortable: true,
    },
    {
        accessor: 'Discount',
        header: "discount_percentage",
        isSortable: true,
    }, 
    {
        accessor: 'Cost Price',
        header: "cp",
        isSortable: true,
    },
    {
        accessor: 'final_price',
        header: "Final Amount in INR",
        isSortable: true,
    }
];


 export function getApiData() {
    return apiData;
 }