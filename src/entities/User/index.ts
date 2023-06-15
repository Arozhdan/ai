export { type UserSchema, type User, type UserResponse } from "./model/types/User.interface"
export { getUserAuthData } from "./model/selectors/getUserAuthData"

export { userReducer, userActions } from "./model/slice/userSlice"
