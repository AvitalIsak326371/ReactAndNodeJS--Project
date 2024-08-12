// businessDataStore.js
import { observable, makeObservable, action, runInAction } from "mobx";

class BusinessDataStore {
  newBusinessData = {
    id: "123",
    name: "Coding Academy",
    address: "Rothschild 60 Tel Aviv",
    phone: "03-1234567",
    owner: "Yariv Katz",
    logo: "https://coding-academy.org/images/ca_logo.png",
    description: "The best coding academy in the world",
  };
  logo = '';

  constructor() {
    makeObservable(this, {
      logo: observable,
      insert: action,
      get: action,
      initData: action,
    });
    this.initData();
  }

  async initData() {
    console.log('logo: ', this.logo);
    const storedLogo = localStorage.getItem('logo');
    if (storedLogo) {
      this.logo = JSON.parse(storedLogo);
    } else {
      this.insert(this.newBusinessData);
    }
  }

  async insert(newBusinessData) {
    const res = await fetch("http://localhost:8787/businessData", {
      method: 'POST',
      body: JSON.stringify(newBusinessData),
      headers: { "Content-Type": "application/json" }
    });
    runInAction(async () => {
      console.log("im in insert");
      if (res.status === 200) {
        console.log("Data entry completed successfully");
        console.log(newBusinessData)
        this.logo = { ...newBusinessData };
        localStorage.setItem('logo', JSON.stringify(newBusinessData));
        console.log({...this.logo});
      }
      else
        console.log(res.status + "Data entry failed");
    })
  }

  async get() {
    const res = await fetch("http://localhost:8787/businessData")
    const data = await res.json()
    this.logo = data
    console.log("im in get")
  }
}

const singleton = new BusinessDataStore();
export default singleton;