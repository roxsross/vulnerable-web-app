//This script is for admins only. It uses a GET request to /ban/user/<username> to permanently ban a user.
//
//It would be really bad if a normal user had access to this script.

function banuser(user){
    var req = new XMLHttpRequest(); 
    req.open("GET", "/ban/user/"+user, true);
    req.send(); 
}
