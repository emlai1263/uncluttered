import bycrpt from "bycrpt";
import jwt from "jsonwebtoken";


const creds = [];

export function registerUser(req, res) {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
       res.status(400).send("Bad request: Invalid input data.");
    } else if (creds.find((c) => c.email === email)) {
        res.status(409).send("Email already used");
    } else {
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(pwd, salt))
          .then((hashedPassword) => {
            generateAccessToken(email).then((token) => {
              console.log("Token:", token);
              res.status(201).send({ token: token });
              creds.push({ name, email, hashedPassword });
            });
          });
      }

    function generateAccessToken(email) {
        return new Promise((resolve, reject) => {
          jwt.sign(
            { email: email },
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
              if (error) {
                reject(error);
              } else {
                resolve(token);
              }
            }
          );
        });
    }
}

export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      console.log("No token received");
      res.status(401).end();
    } else {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (error, decoded) => {
          if (decoded) {
            next();
          } else {
            console.log("JWT error:", error);
            res.status(401).end();
          }
        }
      );
    }
  }

export function loginUser(req, res) {
    const { email, password } = req.body; // from form
    const retrievedUser = creds.find(
      (c) => c.email === email
    );
  
    if (!retrievedUser) {
      // invalid username
      res.status(401).send("Unauthorized");
    } else {
      bcrypt
        .compare(password, retrievedUser.hashedPassword)
        .then((matched) => {
          if (matched) {
            generateAccessToken(email).then((token) => {
              res.status(200).send({ token: token });
            });
          } else {
            // invalid password
            res.status(401).send("Unauthorized");
          }
        })
        .catch(() => {
          res.status(401).send("Unauthorized");
        });
    }
}
