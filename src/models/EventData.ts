import { v4 } from "uuid";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("EventData")
export default class EventData {

    @JsonProperty("uid", String) public readonly uid: string;
    @JsonProperty("createdAt", Number) public readonly createdAt: number;
    @JsonProperty("title", String) public title: string = "";
    @JsonProperty("start", String) public start: string = "";
    @JsonProperty("end", String) public end: string = "";

    constructor() {
        this.uid = v4();
        this.createdAt = Date.now();
    }

}