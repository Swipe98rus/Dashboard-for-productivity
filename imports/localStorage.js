export const updateLocalStorage = (connect, ID, user_ID)=>{
//For reloading
    localStorage.setItem('connect', connect);
    localStorage.setItem('dashboard_id', ID);
    localStorage.setItem('user_id', user_ID);
}