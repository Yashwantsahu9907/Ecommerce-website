import mongoose from "mongoose";

const connect = async () => {
    mongoose.connection.on('connected',() => {
        console.log("DB Connected");

    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

}
export default connect;