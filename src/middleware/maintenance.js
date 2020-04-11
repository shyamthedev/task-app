const maintenance = (req,res,next)=>{
    res.status(503).send('Site is currently down .Please check after sometime')
}

module.exports = maintenance;