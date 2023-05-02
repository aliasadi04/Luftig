export const findUserById=(userId,users)=>{
    
    const foundUser=users.find((user)=>user.uid==userId);
    
    return foundUser;
   
}