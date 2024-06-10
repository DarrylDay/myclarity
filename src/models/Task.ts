import { v4 } from "uuid";
import { JsonObject, JsonProperty } from "json2typescript";
import { getEpochDays } from "@utils/HelperFunctions";
import TaskList from "./TaskList";

@JsonObject("Task")
export default class Task {

    public static Create(name:string, taskList:TaskList) {
        return new Task(name, taskList.uid, taskList.isPriortyList, taskList.isTodayList ? getEpochDays(Date.now()) : 0)
    }

    @JsonProperty("uid", String) public readonly uid: string;
    @JsonProperty("createdAt", Number) public readonly createdAt: number;

    @JsonProperty("name", String) public name: string = "";
    @JsonProperty("completedTime", Number) public completedTime: number = -1;
    @JsonProperty("listUID", String) public listUID: string = "";
    @JsonProperty("priority", Boolean) public priority: boolean = false;
    @JsonProperty("todayEpochDays", Number) public todayEpochDays: number = -1;

    get today() {
        return this.todayEpochDays == getEpochDays(Date.now());
    }

    get completed() { 
        return this.completedTime >= 0 
    }
    set completed(value) {
        if (value && this.completedTime === -1) {
            this.completedTime = Date.now();
        } else if (!value) {
            this.completedTime = -1;
        }
    }

    get completedDate() { 
        return this.completed ? new Date(this.completedTime).toString() : "Never Completed"
    }

    get createdDate() { 
        return new Date(this.createdAt).toDateString()
    }

    constructor(name?:string, listUID?:string, favorite?:boolean, today?:number) {
        this.name = name ? name : "";
        this.listUID = listUID ? listUID : "";
        this.priority = favorite ? favorite : false;
        this.todayEpochDays = today ? today : -1;
        this.uid = v4();
        this.createdAt = Date.now();
    }

    public toggleToday() : void {
        if (this.today) {
            this.todayEpochDays = -1;
        } else {
            this.todayEpochDays = getEpochDays(Date.now());
        }
    }

    public validate() : boolean {
        return this.listUID != "" && this.uid != "" && this.createdAt > 0;
    }

}