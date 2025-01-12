//. app.js
var express = require( 'express' ),
    app = express();

app.use( express.Router() );

var block_bots = 'BLOCK_BOTS' in process.env ? process.env.BLOCK_BOTS : ''; 
if( block_bots ){
  console.log( 'BLOCK_BOTS = "' + block_bots + '"' );
  block_bots = block_bots.split( ',' );
  app.use( function( req, res, next ){
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
    }else{
      next();
    }
  });
}

app.get( '/', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  res.write( JSON.stringify( { status: true }, null, 2 ) );
  res.end();
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );

