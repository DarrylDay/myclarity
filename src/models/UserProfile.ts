import { DatabasePayloadJsonConverter } from "@backend/Database";
import { JsonConverter, JsonCustomConvert, JsonObject, JsonProperty, PropertyConvertingMode } from "json2typescript";

@JsonObject("UserProfile")
export default class UserProfile {

    public static mergeFields = ["firstName", "lastName", "birthday", "marketingConsent", "welcomeRead", "avatarURL", "imageUploaded"];

    public static create(email: string) : UserProfile {
        return new UserProfile(email, Date.now());
    }
    
    @JsonProperty("startDate", Number) public readonly startDate: number = -1;
    @JsonProperty("email", String) public readonly email: string = "";

    @JsonProperty("firstName", String, PropertyConvertingMode.PASS_NULLABLE) public firstName: string = "";
    @JsonProperty("lastName", String, PropertyConvertingMode.PASS_NULLABLE) public lastName: string = "";
    @JsonProperty("birthday", String, PropertyConvertingMode.PASS_NULLABLE) public birthday: string = "";
    @JsonProperty("marketingConsent", Boolean, PropertyConvertingMode.PASS_NULLABLE) public marketingConsent: boolean = false;

    @JsonProperty("welcomeRead", Boolean, PropertyConvertingMode.PASS_NULLABLE) public welcomeRead: boolean = false;

    @JsonProperty("avatarURL", String, PropertyConvertingMode.PASS_NULLABLE) public avatarURL: string = "";
    @JsonProperty("imageUploaded", Boolean, PropertyConvertingMode.PASS_NULLABLE) public imageUploaded: boolean = false;

    private constructor(email:string, startDate: number) {
        this.email = email;
        this.startDate = startDate;
    }

    get fullName() {
        return this.firstName + " " + this.lastName;
    }
}

@JsonConverter
export class UserProfileConverter implements JsonCustomConvert<UserProfile> {
    serialize(profile: UserProfile): any {
        return profile as any;
    }

    deserialize(json: any): UserProfile {
        if (!json.email) throw "Email cannot be undefined";
        if (!json.startDate) throw "StartDate cannot be undefined";
        let profile = UserProfile.create(json.email as string);
        Object.assign(profile, json);
        return profile;
    }    
}

@JsonObject("UserProfilePayloadJsonConverter")
export class UserProfilePayloadJsonConverter implements DatabasePayloadJsonConverter<UserProfile> {
    @JsonProperty("Payload", UserProfileConverter)
    public Payload: UserProfile | undefined; 
}