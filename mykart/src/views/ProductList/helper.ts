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
       header: 'Selling Price',
        accessor: "sp",
        isSortable: true,
    },
    {
        header: 'Discount',
        accessor: "discount_percentage",
        isSortable: true,
    }, 
    {
        accessor: 'cp',
        header: "Cost Price",
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