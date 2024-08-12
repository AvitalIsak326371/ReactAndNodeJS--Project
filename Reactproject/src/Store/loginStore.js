import { observable,makeObservable, action, runInAction} from "mobx"
class LoginStore{
 isAdmin=false;
    constructor()
    {
        makeObservable(this,{
            ifAdmin:action,
            isAdmin:observable,
        });
    }
    async ifAdmin(newUser){
        const res= await fetch("http://localhost:8787/login",
        {
            method: 'POST',
            body: JSON.stringify({...newUser}),
            headers: { "Content-Type": "application/json" }

        });
         runInAction(async () => {
         console.log("im in ifadmin");
          if (res.status === 200) {
             console.log("you are admin");
              this.isAdmin=true;
             }
         else
             {
            console.log(res.status+"you are castomer");
            alert("you are not admin")
            this.isAdmin=false;
        }

    })
    }
  
}
const singleton = new LoginStore();
export default singleton;