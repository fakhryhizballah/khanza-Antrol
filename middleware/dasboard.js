const jwt = require('jsonwebtoken');
module.exports ={
    dashboard : async (req, res, next) => {
        try {
            const token = (req.headers['authorization']).split(' ')[1];
            let data =   jwt.verify(token, process.env.JWT_SECRET_KEY);
            if(data.permission.includes('dashboard')){
                next();
            }else{
                return res.status(401).json({
                    status: false,
                    message: 'Unauthorized Access Dashboard',
                    data: null
                });
            }
           
        } catch (err) {
            return res.status(401).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
}