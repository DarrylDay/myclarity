import { v4 } from "uuid";
import { JsonObject, JsonProperty } from "json2typescript";

export enum ListType {
    User = 0,
    Tasks = 1,
    Priorty = 2,
    Today = 3
}

@JsonObject("TaskList")
export default class TaskList {

    @JsonProperty("uid", String) public uid: string;
    @JsonProperty("createdAt", Number) public createdAt: number;
    @JsonProperty("name", String) public name: string;
    @JsonProperty("completedOpen", Boolean, true) public completedOpen: boolean;

    get RouterLink() { return this.isTodayList ? "today" :
                              this.isPriortyList ? "priorty" :
                              this.uid }

    get Type() { return this._type; } 
    private _type: ListType = ListType.User;

    get isTodayList() { return this._type == ListType.Today; }
    get isPriortyList() { return this._type == ListType.Priorty; }
    get isTasksList() { return this._type == ListType.Tasks; }
    get isUserList() { return this._type == ListType.User; }

    constructor(name?:string, uid?:string, type?:ListType) {
        this.name = name ? name : "";
        this.uid = uid ? uid : v4();
        this.createdAt = Date.now();
        this._type = type ? type : this._type;
        this.completedOpen = false;
    }

    public isSame(taskList:TaskList) {
        return taskList.uid == this.uid && taskList.Type == this.Type;
    }

}

export const todayList = new TaskList("Today", "tasks", ListType.Today);
export const priorityList = new TaskList("Priority", "tasks", ListType.Priorty);
export const tasksList = new TaskList("Tasks", "tasks", ListType.Tasks);