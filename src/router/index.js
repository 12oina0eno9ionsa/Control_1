import Router from 'koa-router'

import {
    addEvent,
    detector
}  from '../actions/event/event'



const router = new Router()



router.post('/event',addEvent);
router.get('/event/:n',detector);




export default router