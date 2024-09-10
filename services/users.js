const { Users, CompaniesOld } = require("../models");
const jwt = require("jsonwebtoken");

const BaseUrl = process.env.FRONTEND_BASE_URL;

const login = async (req, res, next) => {
  console.log(req.body, "sfsdfsdfsf");
  const phone = req.body.phone;
  const user = await Users.findOne({ phone: phone });

  if (!user) {
    let createdUser = await Users.create({ phone: phone });
    let token = jwt.sign(
      {
        iss: createdUser.phone,
        sub: createdUser._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      process.env.SECRET_KEY
    );
    if (token) {
      return res.status(200).json({ token, user:createdUser, success: true });
    }
  }

  let token = jwt.sign(
    {
      iss: user.phone,
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.SECRET_KEY
  );
  if (token) {
    return res.status(200).json({ token, user, success: true });
  }
};

// const register = async (req, res, next) => {
//     let invitedUser = await InvitedUsers.findOne({ utoken: req.body.utoken });
//     const v = new Validator(
//         {
//             utoken: req.body.utoken,
//             password: req.body.password,
//             companyId: req.body.companyId,
//         },
//         {
//             utoken: "required",
//             password: "required|minLength:4",
//             companyId: "required",
//         }
//     );

//     const matched = await v.check();

//     if (!matched)
//         return res.status(422).json({
//             error: v.errors,
//         });

//     let doesUserExist = await Users.findOne({ utoken: req.body.utoken });
//     if (doesUserExist) {
//         if (doesUserExist.password == "") {
//             doesUserExist.password = await bcrypt.hash(req.body.password, 10);

//             const updatedUser = await doesUserExist.save();
//             if (updatedUser) {
//                 let token = jwt.sign(
//                     {
//                         iss: updatedUser.email,
//                         sub: updatedUser._id,
//                         company: req.body.companyId,
//                         iat: new Date().getTime(),
//                         exp: new Date().setDate(new Date().getDate() + 1),
//                     },
//                     process.env.SECRET_KEY
//                 );
//                 return res.status(200).json({
//                     token,
//                     user: updatedUser,
//                     message: "User Password Change Success.",
//                 });
//             } else {
//                 return res.status(422).json({
//                     message: `password reset failed`,
//                 });
//             }
//         } else {
//             return res.status(422).json({
//                 message: `user already register`,
//             });
//         }
//     }

//     req.body.password = await bcrypt.hash(req.body.password, 10);

//     // let doesUserExist = await Users.findOne({ email: req.body.email });
//     // if (doesUserExist)
//     //   return res.status(422).json({
//     //     message: `User already exist with email: ${req.body.email}`,
//     //   });

//     let createdUser = await Users.create({
//         name: invitedUser?.name,
//         email: invitedUser?.email,
//         password: req.body.password,
//         companyId: req.body.companyId,
//         permissionGroupId: invitedUser?.permissionGroupId,
//         utoken: req.body.utoken,
//     });

//     // let createdCompany = await CompaniesOld.create({
//     //     userId: createdUser._id,
//     //     name: "Company name",
//     // });

//     let token = jwt.sign(
//         {
//             iss: createdUser.email,
//             sub: createdUser._id,
//             company: req.body.companyId,
//             iat: new Date().getTime(),
//             exp: new Date().setDate(new Date().getDate() + 1),
//         },
//         process.env.SECRET_KEY
//     );
//     if (createdUser)
//         return res.status(200).json({
//             token,
//             user: createdUser,
//             message: "User Registration Success.",
//         });
//     // if (createdUser) {
//     //   sendEmail(req.body.email);
//     //   return res.status(200).json({
//     //     message: `Successfully created user ${createdUser.name}`,
//     //     data: createdUser,
//     //   });
//     // }
// };
module.exports = {
  login,
};
