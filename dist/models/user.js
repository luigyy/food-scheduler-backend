"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// import bcrypt from "bcrypt";
const userRole_1 = __importDefault(require("../interfaces/userRole"));
// import FoodSchedule from "../interfaces/foodSchedule";
// const salt: number = 10;
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        min: 3,
        max: 20,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        min: 3,
        max: 20,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        min: 3,
        max: 40,
        trim: true,
        required: true,
        unique: [true, "Email already exists"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    role: {
        type: String,
        enum: Object.values(userRole_1.default),
        default: userRole_1.default.USER,
        required: true,
    },
    foodSchedule: {
        type: Array,
        default: [],
    },
}, { timestamps: true });
//PASSWORD STUFF
// //hash password before saving
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const thisObj = this as UserInterface;
//   try {
//     thisObj.password = await bcrypt.hash(thisObj.password, salt);
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });
// //method has to be awaited when use
// UserSchema.methods.comparePasswords = function (
//   candidatePassword: string
// ): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };
// //do not spit password out when retrieving user
// UserSchema.set("toJSON", {
//   transform: function (_: any, ret: any) {
//     delete ret["password"];
//     return ret;
//   },
// });
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user.js.map