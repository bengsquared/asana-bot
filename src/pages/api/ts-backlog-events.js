import Status from 'http-status-codes';

module.exports = (req, res) => {
    const xHookHeader = req.headers["x-hook-secret"];

    // Request to connect a new webhook
    if (xHookHeader) {
        res.setHeader('x-hook-secret', xHookHeader)
        res.send("OK")
    } else {

        // console.log(req.body)

        // Task has been updated
        const events = req.body && req.body.events;
        let tasks = []

        // res.json({
        //     body: req.body,
        //     query: req.query,
        //     cookies: req.cookies,
        // })

        res.send("OK")
    }
}
