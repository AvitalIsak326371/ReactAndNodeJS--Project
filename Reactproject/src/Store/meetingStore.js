import { observable, makeObservable, action, runInAction } from "mobx";

class meetingStore {
    list = [];
    IDcnt = 0;

    constructor() {
        makeObservable(this, {
            list: observable,
            initData: action,
            insert: action
        });
        this.initData();
    }

    async initData() {
        const res = await fetch("http://localhost:8787/appointments");
        const data = await res.json();
        runInAction(() => {
            console.log("data appointment", data.appointments);
            this.list = data.appointments;
        });

        // טעינת הערך של IDcnt מתוך Local Storage
        const storedIDcnt = localStorage.getItem('IDcnt');
        if (storedIDcnt) {
            this.IDcnt = parseInt(storedIDcnt);
        }
    }

    async insert(newMeeting) {
        // בדיקה שכל השדות החובה מולאו
        if (!newMeeting.clientName || !newMeeting.clientPhone || !newMeeting.clientEmail || !newMeeting.dateTime) {
            alert("Please fill in all required fields.");
            return;
        }

        // עדכון ושמירה של הערך של IDcnt ב Local Storage
        this.IDcnt = this.IDcnt + 1;
        localStorage.setItem('IDcnt', this.IDcnt.toString());

        newMeeting.id = this.IDcnt;

        const res = await fetch("http://localhost:8787/appointment", {
            method: 'POST',
            body: JSON.stringify(newMeeting),
            headers: { "Content-Type": "application/json" }
        });

        runInAction(async () => {
            if (res.status === 200) {
                console.log("Add Successfully");
                console.log(newMeeting);
                alert("Add Successfully")
                await this.get();
            } else if (res.status === 400) {
                console.log("Date is already taken");
                alert("Date is already taken")
            } else {
                console.log("Error:", res.status);
            }
        });
    }

    async get() {
        const res = await fetch("http://localhost:8787/appointments");
        const data = await res.json();
        this.list = data;
        console.log("get");
        console.log("data", data);
        return data;
    }
}

const singleton = new meetingStore();
export default singleton;
