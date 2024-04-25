
const data = require('../../data/eventos.json');

let nextEventId=0;
let nextIncidentId=0;


exports.addEvent = async (ctx)=>{
    
    try{
        const {context,metadata,timestamp}=ctx.request.body;
        if(context && metadata && timestamp){
            try{
                const newEvent={
                    event_id: nextEventId++,
                    context: context,
                    metadata: metadata,
                    timestamp: timestamp,
                }
                data.push(newEvent);
                ctx.status=200;
                ctx.body={newEvent};
        
            }
            catch(error){
                ctx.status=500;
                ctx.body={error:'INTERNAL SERVER ERROR'};
            }
        }
        else{
            throw "One or more attributes did no came on the request";
        }
    }
    catch(error){
        ctx.status=400
        ctx.body={status:"NOK",error_message:"One or more attributes did no came on the request"};
    }
    
}



exports.detector = async (ctx)=>{
    
    try{
        const s = ctx.params * 1000;
        const out = [];
        
        for(i in data){
            if(length(out)==0){
                const first={
                    incident_id:nextIncidentId++,
                    incidents:[
                        {
                            event_id:data[0].event_id,
                            context:data[0].context,
                            metadata:data[0].metadata,
                            timestamp:data[0].timestamp
                        }
                    ]
                }
                out.push(first);
            }
            else{
                for(j in out){
                    if(i.metadata==j.incidents[0].metadata && (i.timestmap-j.incidents[0].timestamp<=s)){
                        j.incidents.push(i)
                    }
                    else{
                        const incidente= {
                            event_id:nextIncidentId++,
                            incidents:[i]
                        }
                    }
                }
            }
            
        }
        ctx.status=200;
        ctx.body={out}
        
    }   
    catch(error){
        ctx.status=500;
        ctx.body={status:"NOK",error_message:"INTERNAL ERROR SEVER"};
    }


}