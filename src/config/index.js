export const searchForm={
    FLIGHT:{
        from:{
            type:'text',
            placeholder: 'Enter Location',
            name:"from",
            defaultVisbility:true,
        },
        to:{
            type:'text',
            placeholder:'Enter Destination',
            name:"to",
            defaultVisbility:false,
        },
        passenger:{
            type:'multipleSelect',
            content:{
                Adult:0,
                Child:[]
            }

        }
    }
}
