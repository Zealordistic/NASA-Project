var mongoose  =  require('mongoose');  
   
var PostSchema = new mongoose.Schema({  
    time:{  
        type:String  
    },  
    lon:{  
        type:String  
    },  
    lat:{  
        type:String  
    },  
    precipitationCal:{  
        type:Number  
    }  
});  
   
module.exports = mongoose.model('Post', PostSchema);