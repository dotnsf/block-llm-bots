//. block_llm_bots.js
var express = require( 'express' );

var router = express.Router();

require( 'dotenv' ).config();
var block_bots = 'BLOCK_BOTS' in process.env ? process.env.BLOCK_BOTS : ''; 
if( block_bots ){
  console.log( 'BLOCK_BOTS = "' + block_bots + '"' );
  block_bots = block_bots.split( ',' );
  router.use( function( req, res, next ){
    var ua = req.headers['user-agent'];
    console.log( 'UserAgent: ' + ua );
    ua = ua.toLocaleLowerCase();

    var idx = -1;
    for( var i = 0; i < block_bots.length && idx == -1; i ++ ){
      if( block_bots[i].toLowerCase().startsWith( ua ) ){
        idx = i;
      }
    }

    if( idx > -1 ){
      console.log( '  .. blocked. : ' + block_bots[idx] );
      return false;
    }else{
      next();
    }
  });
}

module.exports = router;
